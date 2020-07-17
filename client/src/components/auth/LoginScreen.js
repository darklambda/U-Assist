import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: 'otakuql@live.cl',
        password: '123456'
    });

    const {email, password} = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        /* Lanzamos la accion para comenzar login. Esta wea hace toda la magia de consultar al back*/
        dispatch(startLogin(email, password));
    }

    

    return (
        <>
            <h2> Iniciar Sesión </h2>
            <form onSubmit={ handleSubmitForm }>
                <div className="form-group">
                    <label> Correo Electrónico </label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        placeholder="ejemplo@ejemplo.cl" 
                        value={email}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <label> Contraseña </label>
                    <input 
                        type="password" 
                        className="form-control"
                        name="password" 
                        placeholder="Contraseña" 
                        value={password}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btnSubmit btn btn-primary"
                    > 
                        Iniciar sesión 
                    </button>
                </div>
            </form>
            <p> ¿No tienes una cuenta? <Link to="/register"> Crea una nueva </Link> </p>
                
        </>
    )
}
