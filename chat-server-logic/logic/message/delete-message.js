const { models: { Message }, mongoose: { ObjectId } } = require('chat-data');
const { utils: { String }, errors: { UnexistenceError, CredentialsError } } = require('chat-commons')
require('dotenv').config();


module.exports = (messageId, userId) => {

    String.notVoid(userId)
    String.notVoid(messageId)
    if (!ObjectId.isValid(messageId)) throw new TypeError('The messageId is not in a valid format');
    if (!ObjectId.isValid(userId)) throw new TypeError('The userId is not in a valid format');

    return (async () => {
        const message = await Message.findById(messageId)
        if (!message) throw new UnexistenceError('Does not exist message with this id');

        if (userId !== message.idUser.toString()) throw new CredentialsError('You can`t eliminate this message')

        await Message.deleteOne({ _id: ObjectId(messageId) })
    })()
}