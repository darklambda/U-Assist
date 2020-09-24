import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from "../../hooks/useForm";
import  logo  from "./favicon.ico";



export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        /* Lanzamos la accion para comenzar login. Esta wea hace toda la magia de consultar al back*/
        dispatch(startLogin(email, password));
    }

    

    return (
        <>
            <div style={{height: "100vh", width: "100vw", backgroundColor: "#da0333", paddingTop: "100px"}}>
                <form  style={{height: "450px", width: "400px", borderRadius: "15px 15px 15px 15px"}} onSubmit={ handleSubmitForm }>
                    <div className="form-group">
                    <img className="icon_u_assist" src={logo} alt="U-Assist"></img>
                    <h2 className="text-tittle-formulary"> Iniciar Sesión </h2>
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
                    <div className="text-center">
                        <div className="form-group">
                            <button type="submit" className="button_formulary"> 

                                Iniciar sesión 
                            </button>
                        </div>
                    </div>
                    <div className="text-center">
                        <p> ¿No tienes una cuenta? <Link to="/register"> Crea una nueva </Link> </p>
                    </div>
                </form>    
            </div>
        </>
    )
}
