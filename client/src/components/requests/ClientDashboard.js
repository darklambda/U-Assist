import React, { useEffect } from 'react'
import { Navebar } from '../ui/Navebar'
import { NewRequestModal } from './NewRequestModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { requestStartLoading } from '../../actions/request'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

export const ClientDashboard = () => {

    

    const {requests} = useSelector(state => state.reqs) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( requestStartLoading() );
    }, [dispatch])

    const handleClick = () => {
        dispatch(uiOpenModal());
    }

     function mostrarCartas(categoria,id,descripcion) {
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
        if (categoria === "Media"){
            return (<Card border="warning" style={{ width: '18rem' }}>
            <Card.Header>SOLICITUD {id}</Card.Header>
            <Card.Body>
            <Card.Title>{categoria}</Card.Title>
            <Card.Text>{descripcion}</Card.Text>
               </Card.Body> 
            </Card>);}
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
        <>
        <Navebar />
            <div className="m-4">
                <h2>Dashboard cliente</h2>
            </div>
            <hr />
            <div className="d-flex justify-content-between m-4 align-items-center">
                <h3>Mis solicitudes</h3>
                <button className="btn btn-sm btn-outline-primary h-50" onClick={handleClick}> 
                    <i className="fas fa-plus width-100"></i> Agregar solicitud  
                </button>
                <Link to="/meet">
                    <button className="btn btn-info mr-5">
                        Iniciar reunión
                    </button>
                </Link>
                     
            </div>
            <div className="m-4">
            <CardDeck>
            {  
           
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <tr key={i.id}>
                       {mostrarCartas(i.categoria,i.id,i.descripcionProblema)}    
    
                        </tr>
                        
                         ) 
                    
                  }
                 </CardDeck>


            
                 </div>

{/*
            <div className="m-4">
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Nivel de Urgencia</th>
                    <th scope="col">Estado de solicitud</th>
                    <th scope="col">Detalles del problema</th>
                    </tr>
                </thead>
               
               
               
               
                <tbody>
                {   
                    (requests.length > 0) 
                    && requests[0].map((i) => 
                        <tr key={i.id}>
                        <th >{i.categoria}</th>
                        <td >{i.estado}</td>
                        <td >{i.descripcionProblema}</td>
                        </tr>
                    ) 
                }
            </tbody>
            </table>
            <hr />    
            </div>
*/}
            <NewRequestModal />
        </>
    )
}
