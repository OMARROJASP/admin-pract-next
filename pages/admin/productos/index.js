import axios from "axios";
import Link from "next/link";

// getStaticProps no corre cuando se realiza en uncomponente
export async function getServerSideProps() {
   const apiRestUrl = process.env.API_REST;


  if (!apiRestUrl) {
    console.log(
      "Error: La variable de entorno API_REST no esta definida. Por favor, revisa tu archivo .env.local."
    );
    return {
      props: {
        products: [],
        error: "API_REST no configurada",
      },
    };
  }

  try {
    const response = await axios.get(`${apiRestUrl}/product`);
    console.log("Aqui estan los productos", response.data.data);
    const products = response.data.data || [];

    return {
      props: {
        products,
        api: apiRestUrl
      },
    };
  } catch (error) {
    console.log("Error al obtener productos desde la API: ", error.message);

    return {
      props: {
        products: [],
        error: "Error al cargar productos",
      },
    };
  }
}


export default function ListProductos({ products = [], api }) {

  
  const eliminarProduct  = async(idProduct) => {
     const apiRestUrl = process.env.API_REST;
    if( !idProduct) {
      alert('No se encontro el producto')
      return;
    }

    try {
      const res = await axios.delete(`${api}/product/${idProduct}`)
      alert('Se elimino el prodcuto')
    }catch (error) {
      console.log('Error al eliminar producto: ', error);
    }
    

  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div style={{display: "flex"}}>
        <ul style={{display: 'grid', 'grid-template-columns': 'repeat(3, 1fr)', gap: '10px', padding: '0px'}}>
          {products.map((p) => (
            <li key={p.prod_id}
            style={{'listStyle': 'none', border: '1px solid', 'borderRadius': '10px',
             padding: '20px 5px', display: 'flex', 'flexDirection': 'column',
              'justifyContent': 'center', 'alignContent': 'center'}}>
            <div style={{display: 'flex', 'flexDirection': 'column',
              'justifyContent': 'center', 'alignContent': 'center', 'textAlign': 'center'}}>
              <img src={p.prod_imageUrl} alt="Descripción de la imagen"/>
              <p>{p.prod_name}</p>
              <p>{p.prod_description}</p>
              <p>s/. {p.prod_price}</p>
              <p>Descuento de  {p.prod_ofert}</p>
            </div>
            
            <div style={{display: 'flex', 'justifyContent': 'space-around'}}>
              <Link href={`/admin/productos/${p.prod_id}`}><button style={{width: '100px'}}>Editar</button></Link>
              <button style={{width: '100px'}} onClick={() => eliminarProduct(p.prod_id)}>Eliminar</button>
            </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
