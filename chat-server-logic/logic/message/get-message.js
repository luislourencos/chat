const { models: { Message, Room }, mongoose: { ObjectId } } = require('chat-data');
const { utils: { String }, errors: { UnexistenceError } } = require('chat-commons')
require('dotenv').config();


module.exports = (roomId, messageId) => {
    String.notVoid(roomId)
    if (!ObjectId.isValid(roomId)) throw new TypeError('The roomId is not in a valid format');
    if (messageId && !ObjectId.isValid(messageId)) throw new TypeError('The messageId is not in a valid format');

    return (async () => {
        const room = await Room.findById(roomId)
        if (!room) throw new UnexistenceError('Does not exist room with this id');

        if (messageId) {
            const message = await Message.findById(messageId).populate('idUser', 'name').sort({ date: 1 }).lean();

            if (!message) throw new UnexistenceError('Does not exist message with this id');

            return [{
                id: message._id.toString(),
                idRoom: message.idRoom,
                idUser: message.idUser,
                message: message.message,
                date: message.date
            }]
        } else {
            const messagesRoom = await Message.find({ idRoom: roomId }).populate('idUser', 'name').sort({ date: 1 }).limit(50).lean();

            if (messagesRoom.length === 0) throw new UnexistenceError('Does not exist messages in this room')

            const sanitizeMessages = messagesRoom.map((message) => {
                message.id = message._id.toString()
                // message.idUser.id = message.idUser._id.toString()
                delete message._id;
                // delete message.idUser._id;
                delete message.__v;
                return message
            })

            return sanitizeMessages
        }
    })()
}
