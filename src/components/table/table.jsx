import { useEffect, useState } from "react"
import style from "./table.module.css"
import axios from "axios";

export default function Table({ data }) {
    const [change, setChange] = useState(true);
    // const [data, setData] = useState([]);

    const deleteTask = (id) => {
        axios.delete(`https://apitodo-2yow.onrender.com/items/${id}`, { headers: { "x-api-key": "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9" }, }).then(()=>{})
    } 

    // const getData = async () => {
    //     await axios.get("https://apitodo-2yow.onrender.com/items", { headers: { "x-api-key": "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9" } }).then((data) => { })
    // };
    

    return (
        <table>
            <thead>
                    <tr>
                    <td>Nombre</td>
                    <td>Descripcion</td>
                    <td>Estado</td>
                    <td>Fecha Finalizacion</td>
                    <td>Acciones</td>
                    </tr>                
            </thead>
            <tbody>
                {
                    data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.name}</td>
                                <td>{element.description}</td>
                                <td>{element.status}</td>
                                <td>{new Date(element.dueDate).toLocaleDateString()}</td>
                                <td><div className={style.actionsContainer}><div className={style.update}>Actualizar</div><div className={style.delete} onClick={(e) => {e.preventDefault(); deleteTask(element.id)}}>Eliminar</div></div></td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}