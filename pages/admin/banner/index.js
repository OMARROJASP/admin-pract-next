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
    const response = await axios.get(`${apiRestUrl}/banner`);
    console.log("Aqui estan los banners", response.data.data);
    const banner = response.data.data || [];

    return {
      props: {
        banners:banner,
        api: apiRestUrl
      },
    };
  } catch (error) {
    console.log("Error al obtener productos desde la API: ", error.message);

    return {
      props: {
        banners: [],
        error: "Error al cargar productos",
      },
    };
  }
}


export default function ListProductos({ banners = [], api }) {

  
  const eliminarProduct  = async(idBanner) => {
    if( !idBanner) {
      alert('No se encontro el producto')
      return;
    }

    try {
        await axios.delete(`${api}/product/${idBanner}`)
        alert('Se elimino el prodcuto')
    }catch (error) {
      console.log('Error al eliminar producto: ', error);
    }
    

  }

  return (
    <div>
      <h1>Lista de banners</h1>
      <div style={{display: "flex"}}>
        <ul style={{display: 'grid', 'grid-template-columns': 'repeat(1, 1fr)', width:'100%', gap: '10px', padding: '0px'}}>
          {banners.map((p) => (
            <li key={p.bnn_id}
            style={{'listStyle': 'none', border: '1px solid', 'borderRadius': '10px',
             padding: '20px 5px', display: 'flex', 'flexDirection': 'column',
              'justifyContent': 'center', 'alignContent': 'center'}}>
            <div style={{display: 'flex', 'flexDirection': 'column',
              'justifyContent': 'center', 'alignContent': 'center', 'textAlign': 'center'}}>
              <img src={p.bnn_image_url_desktop} alt="Descripción de la imagen"/>
              <h4>Banner desktop</h4>
              <img src={p.bnn_image_url_mobile} alt="Descripción de la imagen"/>
              <h4>Banner mobile</h4>
              <p>{p.bnn_title}</p>
              <p>{p.prod_description}</p>
            </div>
            
            <div style={{display: 'flex', 'justifyContent': 'space-around'}}>
              <Link href={`/admin/banner/${p.bnn_id}`}><button style={{width: '100px'}}>Editar</button></Link>
              <button style={{width: '100px'}} onClick={() => eliminarProduct(p.bnn_id)}>Eliminar</button>
            </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
