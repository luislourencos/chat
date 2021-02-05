const { models: { Room }, mongoose: { ObjectId } } = require('chat-data');
const { utils: { String }, errors: { DuplicityError } } = require('chat-commons')
require('dotenv').config();


module.exports = (idCreator, name) => {
    String.notVoid(idCreator)
    String.notVoid(name)

    if (!ObjectId.isValid(idCreator)) throw new TypeError('The idCreator is not a valid format');

    return (async () => {
        const room = await Room.findOne({ name })

        if (room) throw new DuplicityError(`Allready exist one room with this ${name}`)

        const roomCreated = await Room.create({ idCreator: ObjectId(idCreator), name })

        return {
            id: roomCreated._id.toString(),
            name: roomCreated.name,
            idCreator: roomCreated.idCreator,
            date: roomCreated.date
        }
    })()
}
