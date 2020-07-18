import React from 'react'
import { Navbar } from '../ui/Navbar'
import { NewRequestModal } from './NewRequestModal'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

export const ClientDashboard = () => {

    const divStyle = {
        minHeight: '65vh',
    };

    const dispatch = useDispatch();

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
            <div className="m-4" style={divStyle}>
                uwu
            </div>

            <NewRequestModal />
        </>
    )
}
