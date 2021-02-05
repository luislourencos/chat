const { models: { Room }, mongoose: { ObjectId } } = require('chat-data');
const { errors: { UnexistenceError } } = require('chat-commons')
require('dotenv').config();


module.exports = (roomId) => {
    if (roomId && !ObjectId.isValid(roomId)) throw new TypeError('The roomId is not in a valid format');

    return (async () => {
        if (roomId) {
            const room = await Room.findById(roomId)

            if (!room) throw new UnexistenceError('Does not exist room with this id');

            return [{
                id: room._id.toString(),
                idCreator: room.idCreator,
                name: room.name,
                date: room.date
            }]

        } else {
            const rooms = await Room.find({}).sort({ date: -1 });

            if (rooms.length === 0) throw new UnexistenceError('Does not exist rooms in the database')

            const sanitizeRooms = rooms.map(({ _id, idCreator, name, date }) => {
                return {
                    id: _id.toString(),
                    idCreator,
                    name,
                    date
                }
            })

            return sanitizeRooms
        }

    })()

}
