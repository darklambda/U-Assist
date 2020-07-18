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
    codigo: {               // especie de ID del problema
        type: String,
        required: true
    },
    nombreCodigo: {         // el nombre del código. Ej: 200 = transferencias bancarias
        type: String,
        required: true
    },
    descripcionProblema: {  // descripcion del problema. Ej: mi perro se cagó en la tarjeta, ayuda
        type: String,
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
    }
    
});

RequestSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Request', RequestSchema);