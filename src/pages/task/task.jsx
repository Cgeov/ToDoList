import React, { useEffect, useState } from "react";
import Home from "../home/home";
import axios from "axios";
import style from "./task.module.css";
import MuiAlert from "@mui/material/Alert";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import defaultImg from "../../assets/default.png";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Task() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [data, setData] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [menssageAlert, setMessageAlert] = useState("");
  const [indexItem, setIndexItem] = useState(0);

  const deleteTask = (id) => {
    axios
      .delete(`https://apitodo-2yow.onrender.com/items/${id}`, {
        headers: {
          "x-api-key":
            "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9",
        },
      })
      .then(() => {
        setOpen(true)
        setMessageAlert('Se ha Elimado la tarea!')
        getData();
      });
  };

  const updateTask = (id) => {
    var fechaHora = new Date(dueDate);
    var fechaString = fechaHora.toISOString().split('T')[0];

    const toSend = {
      name: name,
      description: description,
      status: status,
      dueDate: fechaString, 
    };

    axios
      .put(`https://apitodo-2yow.onrender.com/items/${id}`,toSend, {
        headers: {
          "x-api-key":
            "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9",
        },
      })
      .then((response) => {
        setOpen(true);
        setMessageAlert('Se ha Modificado la tarea!')
        setHidden(!hidden);
        getData();
        resetData();
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const viewTask = (task) => {
    console.log(task)
    setName(task.name);
    setDescription(task.description);
    setStatus(task.status);
    setDueDate(task.dueDate.split('T')[0]);
    setHidden(false);
    setIndexItem(task.id)
  };

  const createItem = (e) => {
    e.preventDefault();
    if(new Date(dueDate) >= new Date()){
      const toSend = {
        name: name,
        description: description,
        status: status,
        dueDate: dueDate,
      };
      axios
        .post("https://apitodo-2yow.onrender.com/items", toSend, {
          headers: {
            "x-api-key":
              "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9",
          },
        })
        .then(() => {
          setMessageAlert('Se ha Creado la tarea!')
          setOpen(true);
          getData();
        });
      resetData();
    }else{
      setOpenError(true)
    }
    
  };

  const resetData = () => {
    setName("");
    setDescription("");
    setDueDate(new Date().toISOString().slice(0, 10));
    setStatus("todo");
    setIndexItem(0)
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("https://apitodo-2yow.onrender.com/items", {
        headers: {
          "x-api-key":
            "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9",
        },
      })
      .then((data) => {
        console.log(data);
        setTimeout(function () {
          setLoading(false);
          setData(data.data);
        }, 2000);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  return (
    <Home>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {menssageAlert}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          La Fecha de finalización debe ser mayor o igual a la actual!
        </Alert>
      </Snackbar>
      <div className={style.containerTaks}>
        <div>
          <form onSubmit={createItem}>
            <div className={style.containerTwo}>
              <div>
                <label htmlFor="name">Nombre:</label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  id="name"
                  placeholder="Ingrese el nombre de la tarea"></input>
              </div>
              <div>
                <label htmlFor="dueDate">Fecha Finalizacion:</label>
                <input
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                  required
                  type="date"
                  id="dueDate"
                  name="dueDate"></input>
              </div>
            </div>

            <div>
              <label htmlFor="description">Descripcion:</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
                id="description"
                placeholder="Ingrese la descripcion de la tarea"></textarea>
            </div>

            <div>
              <label>Estado:</label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                name="status">
                <option value="todo">Por hacer</option>
                <option value="doing">Realizando</option>
                <option value="done">Finalizado</option>
              </select>
            </div>
            <button hidden={!hidden} type="submit" value="enviar">
              Enviar
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(indexItem);
                updateTask(indexItem);
              }}
              hidden={hidden}
              value="Guardar">
              Modificar
            </button>
          </form>
        </div>

        <div>
          <h1 style={{ color: "#6c65f2", textAlign: 'center' }}>Tasks</h1>
          {loading && (
            <div style={{ width: 205, marginTop: 25 }}>
              <Skeleton
                sx={{ height: 140 }}
                animation="wave"
                variant="rectangular"
              />
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </div>
          )}
          <div className={style.tasks}>
            {data.map((element, index) => (
              <Card key={index} sx={{ width: 200 }}>
                {loading ? (
                  <Skeleton
                    sx={{ height: 140 }}
                    animation="wave"
                    variant="rectangular"
                  />
                ) : (
                  <CardMedia
                    sx={{ height: 140, position: "relative" }}
                    image={defaultImg}
                    title="green iguana">
                    <Chip
                      sx={{
                        position: "absolute",
                        right: 5,
                        top: 5,
                        color: "#6c65f2",
                        background: "#ffffffab",
                      }}
                      size="small"
                      label={
                        element.status === "todo"
                          ? "Pendiente"
                          : element.status === "doing"
                          ? "En Proceso"
                          : "Finalizada"
                      }
                      variant="filled"
                    />
                  </CardMedia>
                )}
                {loading ? (
                  <React.Fragment>
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={10} width="80%" />
                  </React.Fragment>
                ) : (
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#6c65f2" }}>
                      {element.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {element.description}
                    </Typography>
                  </CardContent>
                )}
                <CardActions>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      viewTask(element);
                    }}
                    sx={{ color: "#6c65f2", borderColor: "#6c65f2" }}
                    size="small"
                    variant="outlined">
                    <FaEye size={20} />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteTask(element.id);
                    }}
                    sx={{ color: "#6c65f2", borderColor: "#6c65f2" }}
                    size="small"
                    variant="outlined">
                    <FaTrashCan size={20} />
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Home>
  );
}
