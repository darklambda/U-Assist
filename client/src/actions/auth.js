import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
    return async( dispatch ) => {
        
        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( login({
                uid: body.uid,
                nombre: body.nombre,
                apellido: body.apellido,
                isClient: body.isClient
            }) );
            
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
    }
}

export const startRegister = (nombre, apellido, rut, region, comuna, direccion, telefono, email, password) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken('auth/newClient', {
            nombre, 
            apellido, 
            rut, 
            region, 
            comuna,
            direccion,
            telefono,
            email, 
            password
        }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( login({
                uid: body.uid,
                nombre: body.nombre,
                apellido: body.apellido,
                isClient: body.isClient
            }) );
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

    }
}

export const startChecking = () => {
    return async( dispatch ) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( login({
                uid: body.uid,
                nombre: body.nombre,
                apellido: body.apellido,
                isClient: body.isClient
            }) );
        } else {
            dispatch(checkingFinish());
        } 

    }
}

const checkingFinish = () => ({type: types.AUTH_CHECKED});

const login = (user) => ({
    type: types.AUTH_LOGIN,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({type: types.AUTH_LOGOUT});