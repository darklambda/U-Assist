import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { createRequest, startgettingRequests, startUpdatingRequests} from '../../actions/request';
import './request.css';
import { uiCloseModal, uiCloseSolModal } from '../../actions/ui';
import Checkbox from '@material-ui/core/Checkbox';


export const RequestScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        categoria: "Baja",
        descripcionProblema: ""
    })

    const { categoria, descripcionProblema } = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(createRequest(formValues));
        dispatch(uiCloseModal());
        window.location.href = '/client-dashboard';
    }

    const categorias = ["Baja", "Media", "Alta"];

    return (
            <div className="container align-items-center">
                <div className="testbox">
                    <form onSubmit= { handleSubmitForm } >
                        <h3>Ingreso de Solicitud</h3>
                        <hr />
                        <h5 className="mt-4 mb-4">Categoría</h5>
                        <select 
                            className="form-control"
                            name="categoria"
                            value={categoria}
                            onChange={handleInputChange}>
                            {categorias.map((i) => <option key={i}> {i} </option>)}
                        </select>
                        <h5 className="mt-4 mb-4">Descripción del Problema<span>*</span></h5>
                        <textarea 
                            rows="5"
                            minLength="5"
                            name="descripcionProblema"
                            value= { descripcionProblema } 
                            onChange= { handleInputChange }
                            >
                        </textarea>
                        <hr />
                        <div className="text-center">
                            <div className="form-group">
                                <button type="submit" className="btnSubmit btn btn-primary"> Ingresar solicitud </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export const SelectRequest = () => {

    const {requests} = useSelector(state => state.reqs) || [];
    
    const {uid} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startgettingRequests() );
    }, [dispatch])

    let r = requests[requests.length - 1]

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const {categoria, descripcionProblema} = r.find(req => req.id === e.target.id);
        const id = e.target.id;
        const estado = "En proceso";
        dispatch(startUpdatingRequests({id, categoria, estado, descripcionProblema, uid}))
        dispatch(uiCloseModal());
 
    }

    return (
        <>
        <div className="m-4">
            <h5>Haz doble click sobre la petición que quieres atender </h5>
            <form onSubmit={handleSubmitForm} className="overflow-auto">
                {   
                    (requests.length > 0) 
                    && r.map((i) => 

                    <div id={i.id} className="card border-secondary mb-2" key={i.id} onDoubleClick={handleSubmitForm}>
                        <div id={i.id} className="card-header">{i.categoria} - {i.estado}</div>
                        <div id={i.id} className="card-body">
                            <p id={i.id} className="card-text">{i.descripcionProblema}</p>
                        </div>
                    </div>
                    ) 
                }
            </form>

        </div>
        </>
    )
}

export const SolveRequest = (request) => {  

    const dispatch = useDispatch();
    
    const [checked, setChecked] = useState(false);

    const [formValues, handleInputChange] = useForm({
        solucionProblema: ""
    })

    const {solucionProblema} = formValues;
      
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (checked){

            const estado = "Solucionada";
            
            try {
                const id = request.request.id;
                const descripcionProblema = request.request.descripcionProblema;
                const categoria = request.request.categoria;
                dispatch(startUpdatingRequests({id, categoria, estado, descripcionProblema, solucionProblema}))
                dispatch(uiCloseSolModal());

            } catch (error) {
                console.log("Detallito");
            }  
            
        }
    }

    return (
        <>
        <div className="d-flex justify-content-between m-4 align-items-center">
            <h3>Solucionar solicitud</h3>
            <Link to={{
                pathname:"/meet-executive",
                state: request.request 
            }}
            >
                <button className="btn btn-info mr-5">
                    Iniciar reunión
                </button>
            </Link>
        </div>
        <div className="d-flex justify-content-between m-4 align-items-center">
            <h4>¿Problema solucionado?</h4>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
        <form onSubmit= { handleSubmitForm } >
            <div>
                <h5 className="mt-4 mb-4">Solución del Problema<span>*</span></h5>
                    <textarea 
                        rows="5"
                        minLength="5"
                        name="solucionProblema"
                        value= {solucionProblema}
                        onChange= { handleInputChange }
                    >
                    </textarea>
                    
            </div>
            <div className="text-center">
                <div className="form-group">
                    <button type="submit" className="btnSubmit btn btn-danger col-4"> Solucionar solicitud </button>
                </div>
            </div>
        </form>
        
        
        </>
    )
}

export const ViewRequest = ({request}) => {

    if (!request) {
        return (
            <></>
        )
    } else {
        const {estado, solucionProblema, categoria, 
            descripcionProblema, fechaIngreso, executive, id} = request;
        let color;
        if (request.categoria === "Alta") {
            color = "danger"
        } else if (request.categoria === "Media") {
            color = "warning"
        } else {
            color = "info"
        }

        if (request.estado !== "Solucionada"){
            return (
                <>
                <div 
                    className={`card border-${color} mb-2`}
                    style={{width: "100%", height: "100%"}}
                >
                    <div 
                        className= {`card-header text-${color ==="warning" ? "dark" : "white"} bg-${color}`}
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria} <br/>
                        <strong> Estado: </strong> {estado} <br/>
                        {executive && <p> <strong> Ejecutivo: </strong> {executive.nombre} {executive.apellido} </p>}
                    </div>
                    <div className="card-body overflow-auto">
                        <strong> Fecha de ingreso: </strong> 
                        <p className="card-text">{Date(fechaIngreso)}</p>
                        <strong> Descripción: </strong> 
                        <p className="card-text">{descripcionProblema}</p>
                        <strong> Solución: </strong> 
                        <p className="card-text">{solucionProblema}</p>
                        <hr />
                        <div className="text-center">
                            { executive ?
                                <Link to={{
                                    pathname: "/meet",
                                    state: request
                                }}>
                                <button className="btn btn-success mr-5">
                                    Iniciar reunión
                                </button>
                                </Link>
                                :
                                <button className="btn btn-secondary disabled col-4">Procesando solicitud</button>
                            }
                        </div>
                        
                    </div>
                </div>
                </>
            )
        } else {
            return (
                <>
                <div 
                    className="card border-success mb-2"
                    style={{width: "100%", height: "100%"}}
                >
                    <div 
                        className="card-header text-white bg-success"
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria} <br/>
                        <strong> Estado: </strong> {estado} <br/>
                        {executive && <p> <strong> Ejecutivo: </strong> {executive.nombre} {executive.apellido} </p>}
                    </div>
                    <div className="card-body overflow-auto">
                        <strong> Fecha de ingreso: </strong> 
                        <p className="card-text">{Date(fechaIngreso)}</p>
                        <strong> Descripción: </strong> 
                        <p className="card-text">{descripcionProblema}</p>
                        <strong> Solución: </strong> 
                        <p className="card-text">{solucionProblema}</p>            
                    </div>
                </div>
                </>
            )
        }
    }

}