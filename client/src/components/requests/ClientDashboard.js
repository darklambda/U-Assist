import React, { useEffect } from 'react'
import { Navebar } from '../ui/Navebar'
import { NewRequestModal } from './NewRequestModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal, uiOpenViewModal } from '../../actions/ui'
import { requestStartLoading } from '../../actions/request'
import CardDeck from 'react-bootstrap/CardDeck'
import { ViewRequestModal } from './ViewRequestModal'

export const ClientDashboard = () => {

    const {requests} = useSelector(state => state.reqs) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( requestStartLoading() );
    }, [dispatch])

    const handleClick = () => {
        dispatch(uiOpenModal());
    }

    const handleClickDetails = (request) => {
        dispatch(uiOpenViewModal(request));
    }

    const cartasAlta = (categoria, id, descripcion, request ) => {
        if (categoria === "Alta"){
            return (
                <div 
                    className="card border-danger mb-2" 
                    style={{width: "18rem", height: "13rem"}}
                    onClick={() => handleClickDetails(request)}
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
                    onClick={() => handleClickDetails(request)}
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
                    onClick={() => handleClickDetails(request)}
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
        <>
        <Navebar />
            <div className="m-4">
                <h2>Dashboard cliente</h2>
            </div>
            <hr />
            <div className="d-flex justify-content-between m-4 align-items-center">
                <h3>Mis solicitudes</h3>
                <button className="btn btn-sm btn-success h-50" onClick={handleClick}> 
                    <i className="fas fa-plus width-100"></i> Agregar solicitud  
                </button>
            </div>
            <div className="m-4">
                <p>Haga click sobre la solicitud que desea revisar </p>
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
                {/* <div className="d-flex justify-content-between align-items-center">
                    <h3> WebSocket </h3>
                    <button className="btn btn-sm btn-outline-primary h-50" > 
                        <i className="fas fa-plus width-100"></i> CrearSocket  
                    </button>
                </div>      */}
            </div>
            <NewRequestModal />
            <ViewRequestModal />
        </>
    )
}
