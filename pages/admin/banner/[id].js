import axios from "axios";
import { useEffect , useState} from "react";

export default function EditarProducto ({ banner, idBanner, api}) {

     // const apiRestUrl = process.env.API_REST;



    
      const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrlDesktop, setImageUrlDesktop] = useState(null);
    const [imageUrlMobile, setImageUrlMobile] = useState(null);
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState('1');


        useEffect(() => {
            setTitle(banner.bnn_title)
            setDescription(banner.bnn_description)
            setImageUrlDesktop(banner.bnn_image_url_desktop)
            setImageUrlMobile(banner.bnn_image_url_mobile)
            setActive(Number(banner.bnn_is_active))
            setPosition(banner.bnn_position)
        }, [])

        const EditarProducto = async(e) => {

           
            e.preventDefault();

                  const formData = new FormData();
        formData.append('bnn_title', title)
        formData.append('bnn_description', description)
        formData.append('bnn_image_url_desktop', imageUrlDesktop)
        formData.append('bnn_image_url_mobile', imageUrlMobile)
        formData.append('bnn_is_active', active)
        formData.append('bnn_position', position)


            try {
                const res = await axios.put(`${api}/banner/${idBanner}`, formData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                })
                    alert('Se Actualizo el banner')
                    console.log('Categoría banner', res.data)
            } catch (e) {
                console.error('Error al actualizar banner: ', e)
            }
        }

    return (
        <>
             <h1>Actualizar Banner</h1>
            <form onSubmit={EditarProducto}>
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
                  
                />
                <input 
                    type="file"
                    onChange={(e) => setImageUrlMobile(e.target.files[0])}
                    
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

export async function getServerSideProps(context) {
    const apiRestUrl = process.env.API_REST;
    const { id } = context.params;

    const res = await axios.get(`${apiRestUrl}/banner/${id}`);

    const banner =  res.data.data;
    console.log('Dato del banner', banner);
    return {
        props: {
            banner: banner || null,
            idBanner : id || null,
            api: apiRestUrl || null,
        }
    }


}