import axios from "axios";
import { useEffect, useState } from "react";

export default function EditarCategoria({categoria,idUser}) {
    
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    const [area, setArea] = useState("");

    useEffect(() => {
        setNombre(categoria.cat_name);
        setDescription(categoria.cat_description);
        setStatus(categoria.cat_status);
        setArea(categoria.cat_area);
    }, [])

const EditarCategoria = async (e) => {
    e.preventDefault();


    const formData = new FormData();

    formData.append("cat_name", nombre);
    formData.append("cat_description", descripcion);
    formData.append("cat_imageUrl", image); // image debe ser el archivo, no un string
    formData.append("cat_status", status);
    formData.append("cat_area", area);

    try {
    const res = await axios.put(`http://localhost:3001/category/${idUser}`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
     alert('Se Actualizo la categoria')
        console.log('Categoría Actualizada', res.data)
    } catch (error) {
    console.error("Error al actualizar categoria: ", error);
    }
};

  return (
    <>
      <div>
            <h1>actualizar Categoria</h1>
            <form  onSubmit={EditarCategoria}>
                <input 
                    type="text"
                    value={nombre}
                    onChange={(e) =>  setNombre(e.target.value)}   
                    required                 
                />
                <input 
                    type="text"
                    value={descripcion}
                    onChange={(e) =>  setDescription(e.target.value)}  
                    required                  
                />
                <input 
                    type="file"
                    onChange={(e) =>  setImage(e.target.files[0])}                 
                />
                <input 
                    type="text"
                    value={status}
                    onChange={(e) =>  setStatus(e.target.value)}  
                    required                  
                />
                <input 
                    type="text"
                    value={area}
                    onChange={(e) =>  setArea(e.target.value)}  
                    required                  
                />
                <button type="submit">Actualizar</button>
            </form>
        </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:3001/category/${id}`);

  const category = await res.data.data;
  console.log("DATOS DE LA CATEGORIA: ", category);
  return {
    props: {
      categoria: category || null,
      idUser: id || null
    },
  };
}
