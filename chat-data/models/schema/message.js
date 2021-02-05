const mongoose = require('mongoose');
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema({
    idRoom: {
        type: ObjectId,
        ref: 'Room',
    },
    idUser: {
        type: ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})