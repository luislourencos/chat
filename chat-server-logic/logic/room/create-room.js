const { models: { Room }, mongoose: { ObjectId } } = require('chat-data');
const { utils: { String }, errors: { DuplicityError } } = require('chat-commons')
require('dotenv').config();


module.exports = (idCreator, name, theme) => {
    String.notVoid(idCreator)
    String.notVoid(name)

    if (!ObjectId.isValid(idCreator)) throw new TypeError('The idCreator is not a valid format');

    return (async () => {
        const room = await Room.findOne({ name })

        if (room) throw new DuplicityError(`Allready exist one room with this ${name}`)

        const { _id } = await Room.create({ idCreator: ObjectId(idCreator), name, theme: theme })
        const roomCreated = await Room.findById(_id).populate('idCreator', 'name').lean()

        return {
            id: roomCreated._id.toString(),
            name: roomCreated.name,
            idCreator: roomCreated.idCreator,
            theme: roomCreated.theme,
            date: roomCreated.date
        }
    })()
}
