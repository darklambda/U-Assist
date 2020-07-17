const { Schema, model } = require('mongoose');

const ClientSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        type: String,
        required: true
    },
    comuna: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

ClientSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Client', ClientSchema);