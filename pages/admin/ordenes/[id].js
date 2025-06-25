import axios from "axios";
import { useEffect, useState } from "react";

export default function DetalleOrder({ detalles = [], api,id }) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const initialValue = 0;
        const sumWithInitial = detalles.reduce(
            (accumulator, currentValue) => accumulator + parseFloat(currentValue.ord_det_subtotal), initialValue      )
        
        setTotal(sumWithInitial)
    }, [])

    const changeStatus = async(data) => {
        const payloasd = {
            ord_status: data
        }
        console.log('aqui esta la ruta: ', `${api}/order/${id}`)
        const response = await axios.put(`${api}/order/${id}`,payloasd )

        if (response) {
          alert(`Se ${data} la compra`)
        }
    }

    return (
    <>
        <h1>Detalles del producto</h1>


        <table border="1">
  <thead>
    <tr>
      <th>N°</th>
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Precio unitario</th>
      <th>Descuento</th>
      <th>SubTotal</th>
    </tr>
  </thead>
  <tbody>
    {detalles.map((o, index) => (
      <tr key={o.ord_det_id}>
        <td>{index + 1}</td>
        <td>{o.ord_det_product.prod_name}</td>
        <td>{o.ord_det_quantity}</td>
        <td>{o.ord_det_unit_price}</td>
        <td>{o.ord_det_discount}</td>
        <td>{o.ord_det_subtotal}</td>
      </tr>
    ))}
  </tbody>


</table>


  <div>Precio total de la venta : {total}</div>

  <div>
    <p>Ingresar el pedido como FINALIZADO</p>
    <button onClick={() => changeStatus('COMPLETED')} >Finalizar la compra</button>
    <button onClick={() => changeStatus('CANCELLED')} >Cancelar la compra</button>
  </div>

        
    </>
  );
}

export async function getServerSideProps(context) {
    const apiRestUrl = process.env.API_REST;
        const { id } = context.params;

    if (!apiRestUrl) {
    console.log(
        "Error: La variable de entorno API_REST no esta definida. Por favor, revisa tu archivo .env.local."
    );
        return {
            props: {
                detalles: [],
                error: "API_REST no configurada",
            },
        }   
    }

    try {
        const response = await axios.get(`${apiRestUrl}/details/admin/full/${id}`);
        console.log('Datos de Detalle: ', response.data.data)
        return{
            props: {
                detalles: response.data.data,
                api: apiRestUrl,
                id:id
            }
        }

    }catch (error) {
        console.log("Error al obtener detalle desde la API: ", error.message);

        return {
            props: {
                detalles: [],
                error: "Error al cargar productos",
            },
        };
    }

}
