import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { chile } from '../../chile';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formValues, setformValues] = useState({
        nombre:'',
        apellido:'',
        rut:'',
        region:'V - Valparaíso',
        comuna:'Valparaíso',
        direccion:'',
        telefono:'',
        email: '',
        password: '',
        cpassword: ''
    });

    const { nombre, apellido, rut, region, comuna, direccion, telefono, email, password, cpassword } = formValues;
    
    const [passwordValid, setpasswordValid] = useState(true);
    const [nombreValid, setnombreValid] = useState(true);
    const [apellidoValid, setapellidoValid] = useState(true);
    const [rutValid, setrutValid] = useState(true);
    const [direccionValid, setdireccionValid] = useState(true);
    const [telefonoValid, settelefonoValid] = useState(true);

    const updateComuna = (region) => {
        const comunas = regiones.map( ({nombre, comunas}) => {
            return  (nombre === region) ? comunas : null;
        }).filter( (e) => {
            return e != null;
        });
        return comunas[0][0];
    }

    const handleInputChange = ({target}) => {
        if (target.name === 'region'){
            const c = updateComuna(target.value);
            
            setformValues({
                ...formValues,
                [ target.name ]: target.value,
                comuna: c
            });
        } else {
            setformValues({
                ...formValues,
                [ target.name ]: target.value
            });
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (nombre.length < 3) {
            setnombreValid(false);
        }

        if (apellido.length < 2) {
            setapellidoValid(false);
        }

        if (rut.length < 4) {
            setrutValid(false);
        }

        if (direccion.length < 2) {
            setdireccionValid(false);
        }

        if (telefono.length !== 8) {
            settelefonoValid(false);
        }
        
        if ( (password !== cpassword) || (password.length < 5) ) {
            setpasswordValid(false);
        }

        /*  dispatchear la accion para comunicarse con el backend*/
        dispatch( startRegister(
            nombre, apellido, rut, 
            region, comuna, direccion, 
            telefono, email, password
        ));
    }

    const regiones = chile.map( ({region:r, numero:num, comunas}) => {
        return {
            nombre: num+" - "+r,
            comunas
        };
    });

    const comunas = regiones.map( ({nombre, comunas}) => {
        return  (nombre === region) ? comunas : null;
    }).filter( (e) => {
        return e != null;
    });

    return (
        <>
            <div className="m-4">  
                <h2> Registro </h2>
                <hr />
                <form onSubmit={ handleSubmitForm }>
                    <div className="form-group">
                        <label>Nombres</label>
                        <input 
                            type="text" 
                            name="nombre"
                            className={`form-control ${ !nombreValid && 'is-invalid' }`} 
                            value={nombre}
                            onChange={handleInputChange}
                        />
                        <div className="invalid-feedback">Su nombre debe tener más de 3 caracteres</div> 
                    </div>
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input 
                            type="text" 
                            name="apellido" 
                            className={`form-control ${ !apellidoValid && 'is-invalid' }`} 
                            value={apellido}
                            onChange={handleInputChange} 
                        />
                        <div className="invalid-feedback">Su apellido debe tener más de 2 caracteres</div> 
                    </div>
                    <div className="form-group">
                        <label>RUT</label>
                        <input 
                            type="text" 
                            name="rut" 
                            className={`form-control ${ !rutValid && 'is-invalid' }`} 
                            value={rut}
                            onChange={handleInputChange} 
                        />
                        <div className="invalid-feedback">Ingrese un rut válido</div> 
                    </div>
                    <div className="form-group">
                        <label>Región</label>
                        <select 
                            className="form-control"
                            name="region"
                            value={region}
                            onChange={handleInputChange}>
                            {regiones.map((i) => <option key={i.nombre}> {i.nombre} </option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comuna</label>
                        <select 
                            className="form-control"
                            name="comuna"
                            value={comuna}
                            onChange={handleInputChange}>
                            {comunas[0].map((i) => <option key={i}> {i} </option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Dirección</label>
                        <input 
                            type="text" 
                            name="direccion" 
                            className={`form-control ${ !direccionValid && 'is-invalid' }`} 
                            value={direccion}
                            onChange={handleInputChange} 
                        />
                        <div className="invalid-feedback">Ingrese una dirección válida</div> 
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">+569</span>
                            <input 
                                type="text" 
                                maxLength="8"
                                name="telefono"
                                className={`form-control ${ !telefonoValid && 'is-invalid' }`} 
                                value={telefono}
                                onChange={handleInputChange} 
                            />
                            <div className="invalid-feedback">Ingrese un número de teléfono válido</div> 
                        </div>
                    </div>
                    <div className="form-group">
                        <label> Correo Electrónico </label>
                        <input type="email" 
                            className="form-control" 
                            name="email" 
                            aria-describedby="emailHelp" 
                            placeholder="ejemplo@ejemplo.cl"
                            value={email}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />
                        <label> Repita su contraseña </label>
                        <input 
                            type="password" 
                            className={`form-control ${ !passwordValid && 'is-invalid' }`} 
                            name="cpassword" 
                            placeholder="Repita su contraseña"
                            value={cpassword}
                            onChange={handleInputChange}
                        />
                        <div className="invalid-feedback">La contraseña debe tener al menos 6 caracteres y ambas deben ser iguales</div> 
                    </div>
                    <div className="text-center">
                        <div className="form-group">
                            <button type="submit" className="btnSubmit btn btn-primary"> Registrarse </button>
                        </div>
                    </div>
                </form>
                <hr />
                <div className="text-center">
                    <p> ¿Ya tienes una cuenta? <Link to="/login"> Inicia sesión </Link> </p>
                </div>
            </div>
        </>
    )
}


