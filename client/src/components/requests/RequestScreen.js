import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { createRequest } from '../../actions/request';
import './request.css';
import { uiCloseModal } from '../../actions/ui';

export const RequestScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        categoria: "Baja",
        descripcionProblema: ""
    })

    const { categoria, descripcionProblema } = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(createRequest(formValues));
        dispatch(uiCloseModal());
    }

    const categorias = ["Baja", "Media", "Alta"];

    return (
            <div className="container align-items-center">
                <div className="testbox">
                    <form onSubmit= { handleSubmitForm } >
                        <h3>Ingreso de Solicitud</h3>
                        <hr />
                        <h5 className="mt-4 mb-4">Categoría</h5>
                        <select 
                            className="form-control"
                            name="categoria"
                            value={categoria}
                            onChange={handleInputChange}>
                            {categorias.map((i) => <option key={i}> {i} </option>)}
                        </select>
                        <h5 className="mt-4 mb-4">Descripción del Problema<span>*</span></h5>
                        <textarea 
                            rows="5"
                            minLength="5"
                            name="descripcionProblema"
                            value= { descripcionProblema } 
                            onChange= { handleInputChange }
                            >
                        </textarea>
                        <hr />
                        <div className="text-center">
                            <div className="form-group">
                                <button type="submit" className="btnSubmit btn btn-primary"> Ingresar solicitud </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
}
