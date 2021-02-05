const { model } = require('mongoose')
const { user, room, message } = require('./schema')
module.exports = {
    User: model('User', user),
    Room: model('Room', room),
    Message: model('Message', message)
}