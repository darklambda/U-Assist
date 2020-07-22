import React, { useEffect } from 'react'

import { Navebar } from '../ui/Navebar'
import {SelectRequestModal} from './SelectRequestModal';
import { uiOpenModal, uiOpenSolModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { executiveRequestStartLoading } from '../../actions/request';
import {SolveRequestModal} from '../requests/SolveRequestModal'
import CardDeck from 'react-bootstrap/CardDeck'

// import { signalingSV2 } from '../../actions/request';

export const ExecutiveDashboard = () => {

    const {requests} = useSelector(state => state.reqs) || [];
    
    // const {uid, isClient} = useSelector(state => state.auth);   

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch( executiveRequestStartLoading() );
    }, [dispatch])

    const handleClick = () => {
        dispatch(uiOpenModal());
    }


    // TODO: Agrega info del ejecutivo, no del cliente...  
    const handleClickToSolve = (id, descripcion, categoria, request) => {
        dispatch(uiOpenSolModal(request));
    }

     const cartasAlta = (categoria, id, descripcion, request ) => {
        if (categoria === "Alta"){
            return (
                <div 
                    className="card border-danger mb-2" 
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
        if (categoria === "Media"){
            return (
                <div 
                    className="card border-warning mb-2" 
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
        if (categoria === "Baja"){
            return (
                <div 
                    className="card border-info mb-2" 
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

    return (
        <div>
            <Navebar />
            <div className="m-4">
                <h2>Dashboard Ejecutivo</h2>
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
                </CardDeck>
                <hr />
                <CardDeck>
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <div key={i.id}>
                        {cartasMedia(i.categoria,i.id,i.descripcionProblema, i)}
                        </div>
                    )            
                }
                </CardDeck>
                <hr />
                <CardDeck>
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
