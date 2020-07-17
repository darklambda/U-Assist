const { Schema, model } = require('mongoose');

const ExecutiveSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    sucursal: {
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
    },
    boss: {
        type: Boolean,
        default: false
    }
    
});

ExecutiveSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Executive', ExecutiveSchema);