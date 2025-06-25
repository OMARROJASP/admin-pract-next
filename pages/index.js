import Productos from "./admin/productos";
import "./globals.css"

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline" >Dashboard Practica</h1>
            <Productos />
        </div>
    )
}