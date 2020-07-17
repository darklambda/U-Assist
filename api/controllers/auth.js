const { response } = require('express');
const bcrypt = require('bcryptjs');
const Client = require('../models/Client');
const Executive = require('../models/Executive');
const { generarJWT } = require('../helpers/jwt');

const createClient = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {
        let cliente = await Client.findOne({ email });

        if ( cliente ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya está asociado a una cuenta existente'
            });
        }

        cliente = new Client( req.body );

        /* Encriptar contraseña */
        const salt = bcrypt.genSaltSync();
        cliente.password = bcrypt.hashSync( password, salt );
    
        await cliente.save();

        const token = await generarJWT(cliente.id, cliente.nombre, cliente.apellido, true);
    
        res.status(201).json({
            ok: true,
            uid: cliente.id,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            rut: cliente.rut,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error. Contáctese con el administrador"
        });
    }

}

const createExecutive = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {

        let ejecutivo = await Executive.findOne({ email });

        if ( ejecutivo ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya está asociado a una cuenta existente'
            });
        }

        ejecutivo = new Executive( req.body );

        /* Encriptar contraseña */
        const salt = bcrypt.genSaltSync();
        ejecutivo.password = bcrypt.hashSync( password, salt );
    
        await ejecutivo.save();

        const token = await generarJWT(ejecutivo.id, ejecutivo.nombre, ejecutivo.apellido, false);
    
        res.status(201).json({
            ok:true,
            uid: ejecutivo.id,
            nombre: ejecutivo.nombre,
            apellido: ejecutivo.apellido,
            sucursal: ejecutivo.sucursal,
            token
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error. Contáctese con el administrador'
        });

    }

}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const ejecutivo = await Executive.findOne({ email });
        const cliente = await Client.findOne({ email });
        const usuario = ( ejecutivo ) ? ejecutivo : cliente;

        if ( !usuario ) {
            console.log('El correo electrónico es incorrecto o no está asociado a ninguna cuenta');
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico o la contraseña son incorrectos'
            });
        }
            
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        if ( ejecutivo ) {

            const token = await generarJWT(ejecutivo.id, ejecutivo.nombre, ejecutivo.apellido, false);

            res.json({
                ok: true,
                uid: ejecutivo.id,
                nombre: ejecutivo.nombre,
                apellido: ejecutivo.apellido,
                isClient: false,
                token
            });

        } else {

            const token = await generarJWT(cliente.id, cliente.nombre, cliente.apellido, true)

            res.json({
                ok: true,
                uid: cliente.id,
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                isClient: true, 
                token
            });
        }
        

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error. Contáctese con el administrador'
        });

    }

}

const revalidarToken = async(req, res = response) => {
    const { uid, nombre, apellido, isClient } = req;

    const token = await generarJWT(uid, nombre, apellido, isClient);

    res.json({
        ok:true,
        uid,
        nombre,
        apellido,
        isClient,
        token
    })
}

module.exports = {
    createClient,
    createExecutive,
    loginUsuario,
    revalidarToken
, }