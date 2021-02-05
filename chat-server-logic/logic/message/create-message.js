const { models: { Message }, mongoose: { ObjectId } } = require('chat-data');
const { utils: { String }, errors: { DuplicityError } } = require('chat-commons')
require('dotenv').config();




module.exports = (roomId, idCreator, message) => {

    String.notVoid(roomId)
    String.notVoid(idCreator)
    String.notVoid(message)
    if (!ObjectId.isValid(roomId)) throw new TypeError('The roomId is not a valid format')
    if (!ObjectId.isValid(idCreator)) throw new TypeError('The idCreator is not a valid format')

    return (async () => {
        await Message.deleteMany({ date: { "$lt": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }) // eliminate in 7 days

        const _message = await Message.create({ idRoom: ObjectId(roomId), idUser: ObjectId(idCreator), message })
        return {
            id: _message._id.toString(),
            idRoom: _message.idRoom.toString(),
            idUser: _message.idUser.toString(),
            message: _message.message,
            date: _message.date
        }
    })()
}


