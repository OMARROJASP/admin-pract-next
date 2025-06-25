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
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [category, setCategory] = useState([]);
    const [stock, setStock] = useState('');
    const [supplier, setSupplier] = useState('');

    const listaCategory = categories.map(p => {
        return {value: p.cat_id, label: p.cat_name}
    }) 


    const CrearProducto = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('prod_name', name)
        formData.append('prod_description', description)
        formData.append('prod_price', price)
        formData.append('prod_imageUrl', imageUrl)
        formData.append('prod_category', category)
        formData.append('prod_stock', stock)
        formData.append('prod_supplier', supplier) 

        try {
            const res = await axios.post('http://localhost:3001/product', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log('Producto Creado', res.data)
        } catch (error) {
            console.error('Error al crear producto: ', error)
        }
    }

    return (
        <>
            <h1>Crear Nuevo Producto</h1>
            <form onSubmit={CrearProducto}>
                <input 
                    type="text"
                    value={name}
                    placeholder="Nombre"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    placeholder="precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    required
                />
                {/* <input 
                    placeholder="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
               
                /> */}
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
                    placeholder="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
                    <input 
                    type="number"
                    placeholder="proveedor"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    required
                />
                <button type="submit">Guardar</button>
            </form>
            
        </>
    )
}