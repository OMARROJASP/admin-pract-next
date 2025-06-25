import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Orders ({orders = []}) {


    const [usuarios, setUsuarios] = useState([])

    // useEffect(() => {
    //     setUsuarios(usuarios)
    // }, [])


    const filtrarUsuario = (e) => {
            e.preventDefault();

            setUsuarios(e)
    }

    return (
        <>
            <h1>Lista de Ordenes</h1>

            <div>
                <h1>Buscar por Usuario</h1>
                    
            </div>
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
                orders.map((o, index) => (
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
               
            ))}    </tbody>                 
            </table>
            
        </>
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
        const response = await axios.get(`${apiRestUrl}/order/all`)
        console.log('Aqui esta la lista de Orders : ', response.data)
        return {
            props: {
                orders: response.data.data,
            }
        }
    } catch (error) {
        console.error('Error al obtener order desde la API: ', error.message)
        return {
            props: {
                orders: [],
                error: 'Error al cargar order'
            }
        }
    }
}