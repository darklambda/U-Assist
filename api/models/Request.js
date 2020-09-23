const { Schema, model } = require('mongoose');

const RequestSchema = Schema({
    categoria: {            // categoria: autoatencion, bajo, medio, alto
        type: String,
        required: true
    },
    estado: {               // ingresada, aceptada, en proceso, solucionada
        type: String,
        default: "ingresada",
        required: true
    },
    fechaIngreso: {         // fecha de ingreso de solicitud
        type: Date,
        default: Date.now
    },
    fechaSolucion: {         // fecha en que se soluciona la solicitud
        type: Date
    },
    codigo: {               // especie de ID del problema
        type: String,
        default: "TROUBLE_ID",
        required: true
    },
    nombreCodigo: {         // el nombre del código. Ej: 200 = transferencias bancarias
        type: String,
        default: "TROUBLE_ID_DESCRIPTION",
        required: true
    },
    descripcionProblema: {  // descripcion del problema. Ej: mi perro se cagó en la tarjeta, ayuda
        type: String,
        required: true
    },
    solucionProblema: {
        type: String,
        default: "PENDIENTE",
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    executive: {
        type: Schema.Types.ObjectId,
        ref: 'Executive'
    },
    meet:{
        type: Schema.Types.ObjectId,
        ref: 'Meet'
    },
    score: {
        type: Number,
        default: 0,
        required: true
    }
    
});

RequestSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Request', RequestSchema);