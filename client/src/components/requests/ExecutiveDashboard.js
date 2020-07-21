import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navebar } from '../ui/Navebar'
import {SelectRequestModal} from './SelectRequestModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { executiveRequestStartLoading } from '../../actions/request';
import Card from 'react-bootstrap/Card'
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

     const cartasAlta = (categoria, id, descripcion ) => {
        if (categoria === "Alta"){
            return (<Card border="danger"
                     style={{ width: '18rem' }}
                     className="mb-3">
            <Card.Header>SOLICITUD {id}</Card.Header>
            <Card.Body>
            <Card.Title>{categoria}</Card.Title>
            <Card.Text>{descripcion}</Card.Text>
               </Card.Body> 
            </Card>);}
     }

     const cartasMedia = (categoria, id, descripcion) => {
        if (categoria === "Media"){
            return (<Card border="warning" style={{ width: '18rem' }}>
            <Card.Header>SOLICITUD {id}</Card.Header>
            <Card.Body>
            <Card.Title>{categoria}</Card.Title>
            <Card.Text>{descripcion}</Card.Text>
               </Card.Body> 
            </Card>);}
     }

     const cartasBaja = (categoria, id, descripcion) => {
        if (categoria === "Baja"){
            return (<Card border="info" style={{ width: '18rem' }}>
            <Card.Header>SOLICITUD {id}</Card.Header>
            <Card.Body>
            <Card.Title>{categoria}</Card.Title>
            <Card.Text>{descripcion}</Card.Text>
               </Card.Body> 
            </Card>);}
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
                <Link to="/meet-executive">
                    <button className="btn btn-info mr-5">
                        Iniciar reunión
                    </button>
                </Link>
            </div>

            <div className="m-3">
                <CardDeck>
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <tr key={i.id}>
                        {cartasAlta(i.categoria,i.id,i.descripcionProblema)}
                        </tr>
                    )            
                }
                </CardDeck>
                <hr />
                <CardDeck>
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <tr key={i.id}>
                        {cartasMedia(i.categoria,i.id,i.descripcionProblema)}
                        </tr>
                    )            
                }
                </CardDeck>
                <hr />
                <CardDeck>
                {  
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <tr key={i.id}>
                        {cartasBaja(i.categoria,i.id,i.descripcionProblema)} 
                        </tr>
                    )            
                }
                </CardDeck>
                <hr /> 
                <div className="d-flex justify-content-between align-items-center">
                    <h3> WebSocket </h3>
                    <button className="btn btn-sm btn-outline-primary h-50" > 
                        <i className="fas fa-plus width-100"></i> CrearSocket  
                    </button>
                </div>     
            </div>

            <SelectRequestModal />
        </div>
    )
}
