import React, { useEffect } from 'react'

import { Navebar } from '../ui/Navebar'
import {SelectRequestModal} from './SelectRequestModal';
import { uiOpenModal, uiOpenSolModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { executiveRequestStartLoading, getScore } from '../../actions/request';
import {SolveRequestModal} from '../requests/SolveRequestModal'
import CardDeck from 'react-bootstrap/CardDeck'

// import { signalingSV2 } from '../../actions/request';

export const ExecutiveDashboard = () => {

    const {requests} = useSelector(state => state.reqs) || [];

    const {uid} = useSelector(state => state.auth);
    
    // const {uid, isClient} = useSelector(state => state.auth);   

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch( executiveRequestStartLoading() );
    }, [dispatch])

    const handleClick = () => {
        dispatch(uiOpenModal());
    }


    const handleClickToSolve = (id, descripcion, categoria, request) => {
        dispatch(uiOpenSolModal(request));
    }

     const cartasAlta = (categoria, id, descripcion, request ) => {
        if (categoria === "Alta" && request.estado !== "Solucionada"){
            return (
                <div 
                    className="card border-danger mb-4" 
                    style={{width: "18rem", height: "13rem"}}
                    onClick={() => handleClickToSolve(id, descripcion, categoria, request)}
                >
                    <div 
                        className="card-header text-white bg-danger"
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria}
                    </div>
                    <div className="card-body overflow-auto">
                        <p className="card-text">{descripcion}</p>
                    </div>
                </div>
            )
        }
     }

     const cartasMedia = (categoria, id, descripcion, request) => {
        if (categoria === "Media" && request.estado !== "Solucionada"){
            return (
                <div 
                    className="card border-warning mb-4" 
                    style={{width: "18rem", height: "13rem"}}
                    onClick={() => handleClickToSolve(id, descripcion, categoria, request)}
                >
                    <div 
                        className="card-header text-dark bg-warning"
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria}
                    </div>
                    <div className="card-body overflow-auto">
                        <p className="card-text">{descripcion}</p>
                    </div>
                </div>
                )
        }
     }

     const cartasBaja = (categoria, id, descripcion, request) => {
        if (categoria === "Baja" && request.estado !== "Solucionada"){
            return (
                <div 
                    className="card border-info mb-4" 
                    style={{width: "18rem", height: "13rem"}}
                    onClick={() => handleClickToSolve(id, descripcion, categoria, request)}
                >
                    <div 
                        className="card-header text-light bg-info"
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria}
                    </div>
                    <div className="card-body overflow-auto">
                        <p className="card-text">{descripcion}</p>
                    </div>
                </div>
            )
        }
     }

     const cartasAltaSol = (categoria, id, descripcion, request ) => {
        if (categoria === "Alta" && request.estado === "Solucionada"){
            return (
                <div 
                    className="card border-danger mb-4" 
                    style={{width: "18rem", height: "13rem"}}
                >
                    <div 
                        className="card-header text-white bg-danger"
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria}
                    </div>
                    <div className="card-body overflow-auto">
                        <strong>Problema</strong>
                        <p className="card-text">{descripcion}</p>
                        <strong>Solución</strong>
                        <p className="card-text"> { request.solucionProblema } </p>
                    </div>
                </div>
            )
        }
     }

     const cartasMediaSol = (categoria, id, descripcion, request) => {
        if (categoria === "Media" && request.estado === "Solucionada"){
            return (
                <div 
                    className="card border-warning mb-4" 
                    style={{width: "18rem", height: "13rem"}}
                >
                    <div 
                        className="card-header text-dark bg-warning"
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria}
                    </div>
                    <div className="card-body overflow-auto">
                        <strong>Problema</strong>
                        <p className="card-text">{descripcion}</p>
                        <strong>Solución</strong>
                        <p className="card-text"> { request.solucionProblema } </p>
                    </div>
                </div>
                )
        }
     }

     const cartasBajaSol = (categoria, id, descripcion, request) => {
        if (categoria === "Baja" && request.estado === "Solucionada"){
            return (
                <div 
                    className="card border-info mb-4" 
                    style={{width: "18rem", height: "13rem"}}
                >
                    <div 
                        className="card-header text-light bg-info"
                        >
                        <strong> ID: </strong> {id} <br/>
                        <strong> Nivel de urgencia: </strong> {categoria}
                    </div>
                    <div className="card-body overflow-auto">
                        <strong>Problema</strong>
                        <p className="card-text">{descripcion}</p>
                        <strong>Solución</strong>
                        <p className="card-text"> { request.solucionProblema } </p>
                    </div>
                </div>
            )
        }
     }

     const showScore = () => {
        dispatch( getScore({uid}) );
        //console.log(datos);
     }

    return (
        <div>
            <Navebar />
            <div className="d-flex justify-content-between m-4 align-items-center">
                <h2>Dashboard Ejecutivo</h2>
                <button className="btn btn-sm btn-outline-primary h-50 w-25" onClick={ showScore } >Mi puntaje</button>
            </div>
            <hr />
            <div className="d-flex justify-content-between m-4 align-items-center">
                <h3>Mis solicitudes</h3>
                <button className="btn btn-sm btn-outline-primary h-50 w-25" onClick={handleClick}> 
                    <i className="fas fa-feather-alt"></i> Seleccionar solicitud  
                </button>
            </div>

            <div className="m-3">
                <CardDeck>
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) =>
                        <div key={i.id}> 
                        {cartasAlta(i.categoria,i.id,i.descripcionProblema, i)}
                        </div>
                    )            
                }
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <div key={i.id}>
                        {cartasMedia(i.categoria,i.id,i.descripcionProblema, i)}
                        </div>
                    )            
                }
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <div key={i.id}>
                        {cartasBaja(i.categoria,i.id,i.descripcionProblema, i)} 
                        </div>
                    )            
                }
                </CardDeck>
                <hr />
                <div>
                    <h3>Solicitudes resueltas</h3>
                </div> 
                <CardDeck>
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) =>
                        <div key={i.id}> 
                        {cartasAltaSol(i.categoria,i.id,i.descripcionProblema, i)}
                        </div>
                    )            
                }
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <div key={i.id}>
                        {cartasMediaSol(i.categoria,i.id,i.descripcionProblema, i)}
                        </div>
                    )            
                }
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <div key={i.id}>
                        {cartasBajaSol(i.categoria,i.id,i.descripcionProblema, i)} 
                        </div>
                    )            
                }
                </CardDeck>
                {/* <div className="d-flex justify-content-between align-items-center">
                    <h3> WebSocket </h3>
                    <button className="btn btn-sm btn-outline-primary h-50" > 
                        <i className="fas fa-plus width-100"></i> CrearSocket  
                    </button>
                </div>      */}
            </div>

            <SelectRequestModal />
            <SolveRequestModal />
        </div>
    )
}
