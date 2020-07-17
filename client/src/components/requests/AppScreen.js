import React from 'react'
import { Link } from 'react-router-dom';

export const AppScreen = () => {
    return (
        <div>
            <h1> Pantalla principal (root) </h1>

            <ul>
                <li> <Link to="/login">Login</Link> </li>
                <li> <Link to="/register">Registro</Link> </li>
            </ul>
        </div>
    )
}
