import axios from "axios";
import { useEffect , useState} from "react";

export default function EditarProducto ({ producto, idProduct, api,categories}) {

     // const apiRestUrl = process.env.API_REST;

  const listaCategory = categories.map(p => {
        return {value: p.cat_id, label: p.cat_name}
    }) 

    
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');
        const [description, setDescription] = useState('');
        const [imageUrl, setImageUrl] = useState(null);
        const [category, setCategory] = useState('');
        const [stock, setStock] = useState('');
        const [supplier, setSupplier] = useState('');
    


        useEffect(() => {
            setName(producto.prod_name)
            setPrice(producto.prod_price)
            setDescription(producto.prod_description)
            setImageUrl(producto.prod_imageUrl)
            setCategory(Number(producto.prod_category))
            setStock(producto.prod_stock)
            setSupplier(producto.prod_supplier)
        }, [])

        const EditarProducto = async(e) => {

           
            e.preventDefault();

            const formData = new FormData();

            formData.append('prod_name', name)
            formData.append('prod_price', price)
            formData.append('prod_description', description )
            formData.append('prod_imageUrl', imageUrl )
            formData.append('prod_category',  category)
            formData.append('prod_stock',  stock)
            formData.append('prod_supplier',  supplier)

            try {
                console.log('Aqui esta el enlace: ',`${api}/product/${idProduct}` )
                const res = await axios.put(`${api}/product/${idProduct}`, formData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                })
                    alert('Se Actualizo la categoria')
                    console.log('Categoría Producto', res.data)
            } catch (e) {
                console.error('Error al actualizar producto: ', e)
            }
        }

    return (
        <>
            <h2>Editar Producto</h2>
            <form onSubmit={EditarProducto}>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input 
                    type="file"
                    onChange={(e) => setImageUrl(e.target.files[0])}
                />
                <select required onChange={(e) => setCategory(e.target.value)} >
                <option value={""}>Selecciona una categoría</option>
                    {listaCategory.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input 
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
                    <input 
                    type="number"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    required
                />
                <button type="submit">actualizar</button>
            </form>
            
        </>
    )
}

export async function getServerSideProps(context) {
    const apiRestUrl = process.env.API_REST;
    const { id } = context.params;

    const res = await axios.get(`${apiRestUrl}/product/${id}`);

    const resCategory = await axios.get(`${apiRestUrl}/category`);

    const product =  res.data.data;
    const categories = resCategory.data.data || [];
    console.log('Datso de producto', product);
    return {
        props: {
            producto: product || null,
            idProduct : id || null,
            api: apiRestUrl || null,
            categories: categories || null
        }
    }


}