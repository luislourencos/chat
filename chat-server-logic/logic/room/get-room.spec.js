const { models: { Room, User }, mongoose } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const getRoom = require('./get-room');


describe('Server Logic Get Room', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let name, idCreator, idRooms = [];
    beforeEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        //create a user
        const user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        idCreator = user._id.toString()
        for (let i = 0; i < 10; i++) {
            name = `roomName${random()}`
            const room = await Room.create({ idCreator, name })
            idRooms.push(room._id.toString())
        }

    })

    it('Should success to get one Room', async () => {
        let index = Math.floor(Math.random() * (10 - 0))
        const _room = await getRoom(idRooms[index]);
        expect(_room).to.exist
        expect(_room.length).to.equal(1);
        const [{ id }] = _room
        expect(id).to.equal(idRooms[index])
    })

    it('Should success to all Rooms', async () => {
        const _rooms = await getRoom();
        expect(_rooms).to.exist
        expect(_rooms.length).to.equal(idRooms.length)
        _rooms.forEach((room, index) => {
            expect(room.id).to.equal(idRooms[index])
        })
    })
    it('Should fail to don`t find a room with an a inexistent id', async () => {
        index = Math.floor(Math.random() * (10 - 0))
        await Room.findByIdAndDelete(idRooms[index])
        try {
            await getRoom(idRooms[index]);

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('Does not exist room with this id')
        }
    })
    it('Should fail to don`t find any room', async () => {
        index = Math.floor(Math.random() * (10 - 0))
        await Room.deleteMany()
        try {
            await getRoom();

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('Does not exist rooms in the database')
        }
    })

    describe('Validate fields', () => {

        it('validate idRoom', () => {
            const badIdRoom = `id${random()}`;

            expect(() => {
                getRoom(badIdRoom)
            }).to.throw(TypeError, 'The roomId is not in a valid format')
        })
    })

    afterEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        idRooms = []
    })

    after(async () => {
        await mongoose.disconnect()
    })
})