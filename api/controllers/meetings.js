const { response } = require('express');
const Meet = require('../models/Meet')
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



const createMeeting = async(req, res=response) => {

    // Se crea la nueva reunion
    const meet = new Meet( req.body );

    try {
        meet.request = req.rid;
        const meetSaved = await meet.save();

        // Se buscan los datos correspondientes al correo a enviar

        let fechaReunion = meet.fecha;

        let nombreEjecutivo = ;// buscar el nombre del ejecutivo a cargo de req.rid

        // Se manda el correo

        let mailOptions = {
            from: 'kiwiteamcl@gmail.com',
            to: 'rodrigo.gomez@sansano.usm.cl',
            subject: 'U-Assists | Nueva reunión agendada',
            text: 'Usted tiene una nueva reunion con ' + nombreEjecutivo + ' a las ' + fechaReunion
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.json({
            ok: true,
            meet: meetSaved,
            request: meet.request
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contáctese con el administrador'
        });
    }
}

module.exports = {
    createMeeting
}