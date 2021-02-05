const { models: { Room }, mongoose: { ObjectId } } = require('chat-data');
const { utils: { String }, errors: { DuplicityError, UnexistenceError, CredentialsError } } = require('chat-commons')
require('dotenv').config();


module.exports = (roomId, idCreator, name) => {
    String.notVoid(roomId)
    String.notVoid(idCreator)
    String.notVoid(name)

    if (!ObjectId.isValid(roomId)) throw new TypeError('The roomId is not in a valid format');
    if (!ObjectId.isValid(idCreator)) throw new TypeError('The idCreator is not in a valid format');

    return (async () => {
        const room = await Room.findById(roomId)
        if (!room) throw new UnexistenceError(`This room don't exist`)

        if (idCreator !== room.idCreator.toString()) throw new CredentialsError('This room is not created by you')

        const _room = await Room.findOne({ name })
        if (_room) throw new DuplicityError(`Allready exist one room with this ${name}`)

        await Room.findByIdAndUpdate(roomId, { $set: { name, date: new Date() } })
        const updatedRoom = await Room.findById(roomId);

        return {
            id: updatedRoom._id.toString(),
            name: updatedRoom.name,
            idCreator: updatedRoom.idCreator.toString(),
            date: updatedRoom.date
        }
    })()
}
