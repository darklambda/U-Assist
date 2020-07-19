import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { createRequest, startgettingRequests, startUpdatingRequests} from '../../actions/request';
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
        window.location.href = '/client-dashboard';
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

export const SelectRequest = () => {

    const {requests} = useSelector(state => state.reqs) || [];
    
    const {uid} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startgettingRequests() );
    }, [dispatch])

    let r = requests[requests.length - 1]

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const {categoria, descripcionProblema} = r.find(req => req.id === e.target.id);
        const id = e.target.id;
        dispatch(startUpdatingRequests({id, categoria, descripcionProblema, uid}))
        dispatch(uiCloseModal());
 
    }

    return (
        <>
        <div className="m-4">
            <h5>Haz doble click sobre la petición que quieres atender </h5>
            <form onSubmit={handleSubmitForm} className="overflow-auto">
                {   
                    (requests.length > 0) 
                    && r.map((i) => 

                    <div id={i.id} className="card border-secondary mb-2" key={i.id} onDoubleClick={handleSubmitForm}>
                        <div id={i.id} className="card-header">{i.categoria} - {i.estado}</div>
                        <div id={i.id} className="card-body">
                            <p id={i.id} className="card-text">{i.descripcionProblema}</p>
                        </div>
                    </div>
                    ) 
                }
            </form>

        </div>
        </>
    )
}