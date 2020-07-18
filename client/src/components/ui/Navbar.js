import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const {nombre, apellido} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch( startLogout() );
    }

    return (
        <>
        <div className="navbar navbar-dark bg-dark mb-4">
            
            <span className="navbar-brand"> U-Assist </span>
            <div className="justify-content-end">
                <span className="table-dark mr-4">
                <i className="fas fa-user mr-auto"></i> {nombre} {apellido}
                </span>
                <button 
                    className="btn btn-outline-danger"
                    onClick={ handleLogOut }
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Cerrar sesión </span>
                </button>
            </div>

        </div>

        
        </>
    )
}
