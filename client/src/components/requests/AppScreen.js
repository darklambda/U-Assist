import React from 'react'
import { Link } from 'react-router-dom';

export const AppScreen = () => {
    return (
        <>
            <div className="jumbotron min-vh-100 text-center table-dark bg-danger m-0 d-flex flex-column justify-content-center">
                <h1 className="display-2"> <b> U-Assist </b></h1>
                <p className="lead"> versión &beta; </p>
                <div className="m-4 text-center">

                
                    <Link to="/login">
                        <button className="btn btn-info mr-5">
                            Iniciar sesión
                        </button>
                    </Link> 
                    <Link to="/register">
                        <button className="btn btn-info">
                            Registro
                        </button>
                    </Link>
                </div>
            </div>

            
        </>
    )
}
