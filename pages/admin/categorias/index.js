import axios from "axios";
import Link  from "next/link";  

function eliminarCategorias (idUser) {
   try{
    //await axios.delete(`http://localhost:3001/category/${idUser}`)
     alert('Se elimino la categoria')
    
   }catch (error){
    console.error('Error al eliminar categoria', error)
   }
  

}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:3001/category");
  console.log("Aqui esta la categorias", response.data.data);
  const categories = response.data.data || [];

  return {
    props: {
      categories,
    },
  };
}


export default function Categoria({ categories = [] }) {
  return (
    <>
      <h1>Lista de Categoria</h1>
      <ul>
        {categories.map((p) => (
          <li key={p.cat_id}> 
            <img src={p.cat_imageUrl} />
            <div>{p.cat_name}</div>
            <div>{p.cat_description}</div>
            <button>
              <Link href={`/admin/categorias/${p.cat_id}`}>Editar</Link>
            </button>
            <button onClick={() => eliminarCategorias(p.cat_id)}>Eliminar</button>
            {/* No usar de esta manera porque una vez que cargue se ejecurara el click */}
            {/* <button onClick={eliminarCategorias(p.cat_id)}>Eliminar</button> */}
          </li>
        ))}
      </ul>
    </>
  );
}
