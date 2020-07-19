import React, { useEffect } from 'react'
import { Navbar } from '../ui/Navbar'
import { NewRequestModal } from './NewRequestModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { requestStartLoading } from '../../actions/request'

export const ClientDashboard = () => {

    const {requests} = useSelector(state => state.reqs) || [];    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( requestStartLoading() );
    }, [dispatch])

    const handleClick = () => {
        dispatch(uiOpenModal());
    }

    return (
        <>
        <Navbar />
            <div className="m-4">
                <h2>Dashboard cliente</h2>
            </div>
            <hr />
            <div className="d-flex justify-content-between m-4 align-items-center">
                <h3>Mis solicitudes</h3>
                <button className="btn btn-sm btn-outline-primary h-50" onClick={handleClick}> 
                    <i className="fas fa-plus width-100"></i> Agregar solicitud  
                </button>
            </div>
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
            </div>

            <NewRequestModal />
        </>
    )
}
