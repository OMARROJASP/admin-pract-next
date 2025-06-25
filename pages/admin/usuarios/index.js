import axios from "axios";
import style from './usuarios.module.scss'

export default function Usuarios ({ usuarios }) {

    return (
        <div className={style['pageUsers']}>
            <h1>Lista de Usuario</h1>

            <table border={'1'}>
                <tr>
                    <th>N°</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Dirección</th>
                    <th>Ciudad</th>
                    <th>Codigo Postal</th>

                </tr>
                {
                    usuarios.map((u, index) => (
                        <tr key={u.cx_id}>
                            <td>{index +1   }</td>
                            <td>{u.cx_first_name}</td>
                            <td>{u.cx_last_name}</td>
                            <td>{u.cx_email}</td>
                            <td>{u.cx_phone}</td>
                            <td>{u.cx_address}</td>
                            <td>{u.cx_city}</td>
                            <td>{u.cx_postal_code}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}


export async function getServerSideProps() {
    const apiRestUrl = process.env.API_REST;

    if (!apiRestUrl) {
        console.log(
            'Error: la variable de entorno no esta definida'
        )
        return {
            props: {
                usuarios: [],
                error: 'API_REST no configurada'
            }
        }
    }

    try {
        const response = await axios.get(`${apiRestUrl}/customer`);
        console.log('Aqui esta la lista de usuarios : ', response.data.data)
        const usuarios = response.data.data;
        return{
            props:{
                usuarios: usuarios
            }
        }
    }catch (error) {
        console.error('Error al obtener usuarios desde la API: ', error.message)
        return {
            props: {
                usuarios: [],
                error: 'Error al cargar usuarios'
            }
        }
    }

}