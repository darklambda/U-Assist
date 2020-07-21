import { fetchConToken } from "../helpers/fetch"
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const configuration = {
      iceServers: [{ url: "stun:stun.1.google.com:19302" }]
    };

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

export const signalingSV = (uid, isClient, body) => {
    return async(dispatch) => {
        try {
            let localConnection = new RTCPeerConnection(configuration);
            const client = new W3CWebSocket('ws://localhost:4000');
            client.onopen = () => {
              localConnection.createOffer().then(function(offer) {
                    return localConnection.setLocalDescription(offer);
                  })
                  .then(function() {
                    var sn = {"nec":localConnection.localDescription,
                                "to": '5f0e524eb83222732017b36f',
                                "subject": "conAt",
                                "id": uid,
                                "type": "client"};
                    client.send(JSON.stringify(sn));
                  })
                  .catch();
            };
            client.onmessage = (message) => {
              var data = JSON.parse(message.data);
              console.log("recibi un msh :o");
              console.log(data);
              if (message.data !== "wait"){
                console.log("guess i'll die");
              } else if (message.data.fin === "answer") {
                console.log(localConnection.connectionState);
              } 
            };

        } catch (error) {
            console.log(error);
        }

    }
}

export const signalingSV2 = (uid, isClient) => {
    return async(dispatch) => {
        try {
            let localConnection2 = new RTCPeerConnection(configuration);
            const client = new W3CWebSocket('ws://localhost:4000');
            client.onopen = () => {
              var data = {"subject":"conAt", "id": uid, "type": "executive", "to": "idk"};
              client.send(JSON.stringify(data)); 
            };
            client.onmessage = (message) => {
              console.log(message);
              if (message.data !== "wait") {

                var data = JSON.parse(message.data);
                var sendTo = data.id;
                console.log(data.nec);
                var desc = new RTCSessionDescription(data.nec);
                localConnection2.setRemoteDescription(desc);
                var ans = localConnection2.createAnswer();
                localConnection2.setLocalDescription(ans);
                console.log("i made it here");
                var sn = {"nec":localConnection2.localDescription,
                                "to": sendTo,
                                "subject": "conAt",
                                "id": uid,
                                "type": "executive", 
                                "fin": "answer"};
                    console.log(typeof sn);
                    client.send(JSON.stringify(sn));
                console.log(localConnection2.iceConnectionState, "wot");
                
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