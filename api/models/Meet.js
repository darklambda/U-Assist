const { Schema, model } = require('mongoose');

const MeetSchema = Schema({

    fecha: {
        type: Date,
        required: true
    },
    notasReunion: {
        type: String,
        default: ""
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    }
});

MeetSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Meet', MeetSchema);