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

export const executiveRequestStartLoading = (event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('requests/executive-requests', event);
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

export const startgettingRequests = (event) => {
    return async(dispatch) => {
        try {

            const resp = await fetchConToken('requests/available-requests', event);
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

export const startUpdatingRequests = (event) => {
    return async(dispatch) => {
        
        try { 
            const resp = await fetchConToken(`requests/${event.id}`, event, 'PUT');
            const body = await resp.json();

            console.log('cliente');
            console.log(event);
            
            if (body.ok) {
                dispatch(requestUpdated(event));
                Swal.fire('', 'Solicitud actualizada correctamente', 'success');
            } else {
                if (body.errors) {
                    let errs = Object.entries(body.errors).map((k) => {
                        return k[1].msg;
                    }).join('<br>')
                    Swal.fire('Error', errs, 'error');
                } else {
                    Swal.fire('Error', body.msg, 'error');
                }
            }

        } catch (error) {
            console.log(error);
        }

    }
}

export const getScore = (event) => {
    return async(dispatch) => {
        try {
            
            const resp = await fetchConToken('requests/rating', event);
            const body = await resp.json();

            console.log("body", body);
            console.log(event);

            if (body.ok) {
                dispatch( requestScore(event) );
            } else {
                Swal.fire('', body.errors.descripcionProblema.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}



const requestLoaded  = (data) => ({type: types.REQUEST_LOADED, payload:data});
const newRequest     = (data) => ({type: types.REQUEST_CREATION, payload: data});
const requestUpdated = (data) => ({type: types.REQUEST_UPDATED, payload: data});
const requestScore = (data) => ({type: types.REQUEST_SCORE, payload: data});