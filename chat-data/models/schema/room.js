const mongoose = require('mongoose');
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    idCreator: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
    }

})