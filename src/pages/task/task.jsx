import { useEffect, useState } from "react";
import Home from "../home/home";
import axios from "axios";
import Table from "../../components/table/table";
import style from "./task.module.css"

export default function Task() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [dueDate, setDueDate] = useState('');
    const [data, setData] = useState([]);
    const [hidden, setHidden] = useState(true);


    const deleteTask = (id) => {
        axios.delete(`https://apitodo-2yow.onrender.com/items/${id}`, { headers: { "x-api-key": "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9" }, }).then(()=>{getData()})
    } 

    const updateTask = () => {
        axios.put(`https://apitodo-2yow.onrender.com/items/`, { headers: { "x-api-key": "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9" }, }).then(()=>{setHidden(!hidden)})
    } 

    const viewTask = (task) => {
        setName(task.name);
        setDescription(task.description)
        setStatus(task.status)
        setDueDate(task.dueDate);
        setHidden(false)
    } 

    const createItem = (e) => {
        e.preventDefault();
        const toSend = { name: name, description: description, status: status, dueDate: dueDate }
        axios.post("https://apitodo-2yow.onrender.com/items", toSend, { headers: { "x-api-key": "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9" }, }).then(()=>{getData()})
        resetData();
    }

    const resetData = () => {
        setName('');
        setDescription('');
        setDueDate(new Date());
        setStatus('todo')
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await axios.get("https://apitodo-2yow.onrender.com/items", { headers: { "x-api-key": "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9" } }).then((data) => { setData(data.data) })
    };

    return (
        <Home>
            <div>
                <form onSubmit={createItem}>
                    <div>
                        <label htmlFor="name">
                            Nombre:
                        </label>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} required id="name" placeholder="Ingrese su nombre"></input>
                    </div>
                    <div>                    
                    <label htmlFor="description">
                        Descripcion:
                    </label>
                        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} required id="description" placeholder="Ingrese la descripcion de la tarea"></textarea></div>
                    <div>
                    <label htmlFor="dueDate">
                        Fecha Finalizacion:
                    </label>
                    <input value={dueDate} onChange={(e) => { setDueDate(e.target.value) }} required type="date" id="dueDate" name="dueDate"></input>
                    </div>
                    <div>
                    <label>
                        Estado:
                    </label>
                    <select value={status} onChange={(e) => { setStatus(e.target.value) }} name='status'>
                        <option value='todo'>Por hacer</option>
                        <option value='doing'>Realizando</option>
                        <option value='done'>Realizado</option>
                    </select>
                    </div>
                    <button hidden={!hidden} type="submit" value="enviar">Enviar</button>
                </form>
                <div hidden={hidden} onClick={(e) => {e.preventDefault();updateTask()} }>Actualizar</div>
            </div>

            <div>
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
                                <td><div className={style.chipStatus}>{element.status == 'todo' ? 'Por Hacer' : element.status == 'doing' ? 'En Proceso' : 'Finalizada'}</div></td>
                                <td>{new Date(element.dueDate).toLocaleDateString()}</td>
                                <td><div className={style.actionsContainer}><div onClick={(e) => {e.preventDefault(); viewTask(element)}} className={style.update}>Visualizar</div><div className={style.delete} onClick={(e) => {e.preventDefault(); deleteTask(element.id)}}>Eliminar</div></div></td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
            </div>
        </Home>
    )
}