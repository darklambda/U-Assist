const { response } = require('express');
const Request = require('../models/Request');
const Executive = require('../models/Executive');
const Client = require('../models/Client');

var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'kiwiteamcl@gmail.com',
        pass: '#!k1w1t34m'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);



const sendEmail = async(req, res=response) => {

    // buscar toda la info necesaria, mandar correo y enviar respuesta
    //const request = new Request( req.body );

    

    var mailOptions = {
        from: 'kiwiteamcl@gmail.com',
        to: 'rodrigo.gomez@sansano.usm.cl',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

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