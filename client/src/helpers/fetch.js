/* aquí conectamos el back con el front */
const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = ( endpoint, data, method='GET' ) => {
    
    const url = `${baseUrl}/${endpoint}`; //endpoint = login, client-dashboard, etc (rutas)
    
    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchConToken = ( endpoint, data, method='GET' ) => {
    
    const url = `${baseUrl}/${endpoint}`; //endpoint = login, client-dashboard, etc (rutas)
    const token = localStorage.getItem('token') || '';
    
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}


export {
    fetchSinToken,
    fetchConToken
}