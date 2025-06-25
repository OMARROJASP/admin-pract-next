import { useEffect, useState } from 'react';
import style from '../admin/admin.module.scss'
import axios from "axios";
import Link from "next/link";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export  default function PageAdmin({usuarios, categoria, productos, orders = [], orderDay =[]}) {


    const [tipo, setTipo] = useState({});

    const [ordenes, setOrdenes] = useState([])

    console.log('Aqui hay ordenes: ', orders)
    useEffect(() => {

           if (!Array.isArray(orders)) {
        console.error('Error: orders no es un array', orders);
        return;
    }

        const resultados  = {};

        orders.forEach(order => {
            const estado = order.ord_status;

            if (resultados[estado]) {
                resultados[estado]++;
            } else {
                resultados[estado] = 1
            }
        });

        console.log(resultados )
        setTipo(resultados)

        const nuevosOrdenes = orders.slice(0,5)
        setOrdenes(nuevosOrdenes)


    },[])

    return (
        <div className={style['pageAdmin']} >
            <h3 className={style['title']}>Pagina principal del admín</h3>
            <div className={style['bodyAdmin']}>
                <div className={style['division']}>
                    <h4>Total de productos</h4>
                    <p>{productos} productos </p>
                </div>

                <div className={style['division']}>
                    <h4>Total de categorias</h4>
                    <p> {categoria} productos </p>
                </div>

                <div className={style['division']}>
                    <h4>Total de ordenes finalizadas</h4>
                    <p>{tipo['COMPLETED']} </p>
                </div>
                <div className={style['division']}>
                    <h4>Total de ordenes Canceladas</h4>
                    <p>{tipo['CANCELLED']} </p>
                </div>
                <div className={style['division']}>
                    <h4>Total de ordenes en proceso</h4>
                    <p>{tipo['IN_PROGRESS']} </p>
                </div>
                <div className={style['division']}>
                    <h4>Total de ordenes creados</h4>
                    <p>{tipo['CREATED']} </p>
                </div>

                <div className={style['division']}>
                    <h4>Total de Usuarios   </h4>
                    <p>{usuarios} productos </p>
                </div>
            </div>
            <div>
                <div>
                    <h5>Ultimos pedidos</h5>
                    <table border={'1'}>
              <thead>
                <tr>
                    <th>N°</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Mas Detalle</th>
                </tr>
            </thead>
            <tbody>
            {
                ordenes.map((o, index) => (
                <tr key={o.ord_id}>
                    <td>{index + 1}</td>
                    <td>{o.ord_customer.cx_first_name + ' ' + o.ord_customer.cx_last_name}</td>
                    <td>{o.ord_customer.cx_email}</td>
                    <td>{o.ord_status}</td>
                    <td>{o.ord_date}</td>
                    <button>
                    <Link href={`/admin/ordenes/${o.ord_id}`}>Mas</Link>
                    </button>
                </tr>
            ))}
            </tbody>
            </table>
                </div>
            </div>
            <div>
                <h3>Datos Estadisticos</h3>

                <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={orderDay}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>

                

            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const apiRestUrl = process.env.API_REST;

     if (!apiRestUrl) {
        console.log(
            'Error: la variable de entorno no esta definida'
        )
        return {
            props: {
                usuarios: [],
                error: 'API_REST no configurada'
            }
        }
    }

    try {
        const responseProducto = await axios.get(`${apiRestUrl}/product`);
        const responseCategory = await axios.get(`${apiRestUrl}/category`);
        const responseUsers = await axios.get(`${apiRestUrl}/customer`);        
        const responseOrdersByDay = await axios.get(`${apiRestUrl}/order/allday`);
        const responseOrders = await axios.get(`${apiRestUrl}/order/all`);


        const totalProductos = responseProducto.data.data.length;
        const totalCategorias = responseCategory.data.data.length;
        const totalUsuarios = responseUsers.data.data.length;
        const totalOrders = responseOrders.data.data;
        const totalOrderDay = responseOrdersByDay.data.data;

        // console.log('Aqui esta la lista de productos : ', totalProductos);
        // console.log('Aqui esta la lista de categoria : ', totalCategorias);
        // console.log('Aqui esta la lista de usuarios : ', totalUsuarios);
        // console.log('Aqui esta la lista de usuarios : ', totalOrders);
          console.log('Aqui esta la lista de usuarios : ', totalOrderDay);

        return {
            props: {
                usuarios: totalUsuarios,
                productos: totalProductos,
                categoria: totalCategorias,
                orders: totalOrders,
                orderDay: totalOrderDay
            }
        };
    }catch (error) {
        console.error('Error al obtener usuarios desde la API: ', error.message)
        return {
            props: {
                usuarios: 0,
                productos: 0,
                categoria: 0,
                orders:0,
                orderDay: [],
                error: 'Error al cargar usuarios'
            }
        }
    }

}