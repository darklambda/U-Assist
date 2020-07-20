import { fetchConToken } from "../helpers/fetch"
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";

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
            
            if (body.ok) {
                dispatch(requestUpdated(event));
            } else {
                console.log(body.errors)
            }

        } catch (error) {
            console.log(error);
        }

    }
}

export const signalingSV = (uid, isClient) => {
    return async(dispatch) => {
        try {
            console.log(uid, isClient);
            const client = new W3CWebSocket('ws://localhost:4000');
            client.onopen = () => {
              var data = {"subject":"conAt", "id": "user", "type": "client", "to": "user2"};
              client.send(JSON.stringify(data)); 
            };
            client.onmessage = (message) => {
              if (message.data != "wait"){
                //do the magic with message.data.nec and create the rtc object
              }
              console.log(message);
              console.log("he recibido un mensaje del servidor")
            };

        } catch (error) {
            console.log(error);
        }

    }
}

export const signalingSV2 = (event) => {
    return async(dispatch) => {
        try {
            //console.log(uid, isClient);
            const client = new W3CWebSocket('ws://localhost:4000');
            client.onopen = () => {
              var data = {"subject":"conAt", "id": "user", "type": "executive", "to": "user2"};
              client.send(JSON.stringify(data)); 
            };
            client.onmessage = (message) => {
              console.log(message);
              if (message.data != "wait") {

              }
              console.log("he recibido un mensaje del servidor")
            };

        } catch (error) {
            console.log(error);
        }

    }
}

const requestLoaded  = (data) => ({type: types.REQUEST_LOADED, payload:data});
const newRequest     = (data) => ({type: types.REQUEST_CREATION, payload: data});
const requestUpdated = (data) => ({type: types.REQUEST_UPDATED, payload: data});