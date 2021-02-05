const { models: { Room, Message }, mongoose: { ObjectId } } = require('chat-data');
const { utils: { String }, errors: { CredentialsError, UnexistenceError } } = require('chat-commons')
require('dotenv').config();


module.exports = (roomId, idCreator) => {
    String.notVoid(roomId)
    String.notVoid(idCreator)
    if (!ObjectId.isValid(roomId)) throw new TypeError('The roomId is not in a valid format');
    if (!ObjectId.isValid(idCreator)) throw new TypeError('The idCreator is not in a valid format');

    return (async () => {
        const room = await Room.findById(roomId)
        if (!room) throw new UnexistenceError('Does not exist room with this id');

        if (room.idCreator.toString() !== idCreator) throw new CredentialsError('You can`t eliminate this room')

        await Message.deleteMany({ idRoom: roomId })
        await Room.deleteOne({ _id: ObjectId(roomId) })
    })()
}
