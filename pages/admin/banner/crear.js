import axios from "axios";
import { useState } from "react"

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


export default function CrearProducto ({categories}) {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrlDesktop, setImageUrlDesktop] = useState(null);
    const [imageUrlMobile, setImageUrlMobile] = useState(null);
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState('1');

    


    const CrearBanner = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bnn_title', title)
        formData.append('bnn_description', description)
        formData.append('bnn_image_url_desktop', imageUrlDesktop)
        formData.append('bnn_image_url_mobile', imageUrlMobile)
        formData.append('bnn_is_active', active)
        formData.append('bnn_position', position)

        try {
            const res = await axios.post('http://localhost:3001/banner', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log('Banner Creado', res.data)
        } catch (error) {
            console.error('Error al crear banner: ', error)
        }
    }

    return (
        <>
            <h1>Crear Nuevo Banner</h1>
            <form onSubmit={CrearBanner}>
                <input 
                    type="text"
                    value={title}
                    placeholder="Titulo"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    value={description}
                    placeholder="descripcion"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input 
                    type="file"
                    onChange={(e) => setImageUrlDesktop(e.target.files[0])}
                    required
                />
                <input 
                    type="file"
                    onChange={(e) => setImageUrlMobile(e.target.files[0])}
                    required
                />
                {/* <input 
                    placeholder="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
               
                /> */}
                <input 
                    type="text"
                    placeholder="active"
                    value={active}
                    onChange={(e) => setActive(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    placeholder="posicion"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
                <button type="submit">Guardar</button>
            </form>
            
        </>
    )
}