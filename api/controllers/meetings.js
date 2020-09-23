const { response } = require('express');
const Request = require('../models/Request');
const Executive = require('../models/Executive');
const Client = require('../models/Client');

const sendEmail = async(req, res=response) => {

    // buscar toda la info necesaria, mandar correo y enviar respuesta
    //const request = new Request( req.body );
    console.log("entreaqui", req)
    return res.json({ok: true})
    /*
    try {
        request.client = req.uid;
        const requestSaved = await request.save();
        return res.json({
            ok: true,
            request: requestSaved,
            client: request.client
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contáctese con el administrador'
        });
    }
    */
}

module.exports = {
    sendEmail
}