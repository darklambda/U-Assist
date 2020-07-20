import React, { useEffect } from 'react'
import { Navebar } from '../ui/Navebar'
import {SelectRequestModal} from './SelectRequestModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { executiveRequestStartLoading } from '../../actions/request';
import { signalingSV2 } from '../../actions/request';


export const ExecutiveDashboard = () => {

    const {requests} = useSelector(state => state.reqs) || [];
    const {uid, isClient} = useSelector(state => state.auth) || [];   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( executiveRequestStartLoading() );
    }, [dispatch])

    const handleClick = () => {
        dispatch(uiOpenModal());
    }

    const handleClick2 = () => {
        dispatch(signalingSV2(uid, isClient));
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

            <div>
                <h3> WebSocket </h3>
                <button className="btn btn-sm btn-outline-primary h-50" onClick={handleClick2}> 
                    <i className="fas fa-plus width-100"></i> CrearSocket  
                </button>
            </div>

            <SelectRequestModal />
        </div>
    )
}
