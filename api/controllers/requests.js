const { response } = require('express');
const Request = require('../models/Request');
const Executive = require('../models/Executive');
const Client = require('../models/Client');

const getRequestsClient = async(req, res=response) => {

    const requests = await Request.find({client: req.uid})
                                  .populate('client', 'nombre apellido rut')
                                  .populate('executive', 'nombre apellido sucursal email telefono');

    return res.json({
        ok: true,
        requests
    });

}

const getRequestsExecutive = async(req, res=response) => {

    const requests = await Request.find({executive: req.uid})
                                  .populate('executive', 'nombre apellido sucursal')
                                  .populate('client', 'nombre apellido rut email telefono');

    return res.json({
        ok: true,
        requests
    });

}

const createRequest = async(req, res=response) => {

    const request = new Request( req.body );

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
 
}

const updateRequest = async(req, res=response) => {

    const requestID = req.params.id;
    const Clientuid = await Client.findById(req.uid);
    const Executiveuid = await Executive.findById(req.uid);

    try {
        
        const request = await Request.findById(requestID);
        
        if (!request) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una solicitud con el ID proporcionado'
            });
        }

        if ( request.client.toString() !== req.uid && !Executive) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar esta solicitud'
            });
        }

        if (!Executiveuid && !Clientuid) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un ejecutivo con el ID proporcionado"
            });
        }

        let newRequest = {
            ...req.body
        } 

        if (Clientuid) {
            newRequest["client"] = req.uid;
        } else {
            newRequest["executive"] = req.uid;
        }

        const updatedRequest = await Request.findByIdAndUpdate(requestID, newRequest, {new: true});

        return res.json({
            ok: true,
            request: updatedRequest
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contáctese con el administrador'
        });
    }

}

const deleteRequest = async(req, res=response) => {
    
    const requestID = req.params.id;
    const uid = req.uid;

    try {
        
        const request = await Request.findById(requestID);
        
        if (!request) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una solicitud con el ID proporcionado'
            });
        }

        if ( request.client.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar esta solicitud'
            });
        }

        await Request.findByIdAndDelete(requestID);

        return res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contáctese con el administrador'
        });
    }

}

const getAvailableRequests = async(req, res=response) => {
    const requests = await Request.find({executive: null})
    return res.json({
        ok: true,
        requests
    });

}

const getRating = async(req, res=response) => {
    const requests = await Request.find({executive: req.uid}, {score1:1, score2:1, score3:1})
    console.log(requests);

    return res.json({
        ok:true,
        requests
    })
}

module.exports = {
    getRequestsClient,
    getRequestsExecutive,
    createRequest,
    updateRequest,
    deleteRequest,
    getAvailableRequests,
    getRating
}