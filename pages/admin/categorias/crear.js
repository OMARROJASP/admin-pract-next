import axios from "axios";
import { useState } from "react";

export default function NuevaCategoria () {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    const [area, setArea] = useState("");

    const crearCategoria = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("cat_name", nombre);
        formData.append("cat_description", descripcion);
        formData.append("cat_imageUrl", image); // image debe ser el archivo, no un string
        formData.append("cat_status", status);
        formData.append("cat_area", area);

        try {
            const res = await axios.post("http://localhost:3001/category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
        });
            console.log('Categoría creada', res.data)
        } catch (error) {
            console.error('Error al crear categoria: ', error)
        }
    }


    return (
        <div>
            <h1>Crear Nueva Categoria</h1>
            <form  onSubmit={crearCategoria}>
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
                    required                  
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
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}