import { fetchConToken } from "../helpers/fetch"
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const createRequest = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('requests', event, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch( newRequest(event) );
                Swal.fire('', 'Solicitud registrada correctamente', 'success');
            } else {
                Swal.fire('', body.errors.descripcionProblema.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const requestStartLoading = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('requests', event);
            const body = await resp.json();

            if (body.ok) {
                dispatch( requestLoaded(body.requests) );
            } else {
                Swal.fire('', body.errors.descripcionProblema.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const requestLoaded = (data) => ({type: types.REQUEST_LOADED, payload:data});
const newRequest    = (data) => ({type: types.REQUEST_CREATION, payload: data});
// const activeRequest = (data) => ({type: types.REQUEST_SET_ACTIVE, payload:data});