const { models: { Room, User, Message }, mongoose } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const deleteRoom = require('./delete-room');


describe('Server Logic Delete Room', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let idCreator, roomId, messages = []
    beforeEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        await Message.deleteMany()
        //create a user
        const user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        idCreator = user._id.toString()
        //create a room
        const room = await Room.create({ idCreator, name: `name${random()}` })
        roomId = room._id.toString()
        //create messages
        for (let i = 0; i < 10; i++) {
            let message = `random message ${random()}`
            const _messages = await Message.create({ idRoom: roomId, idCreator, message })
            messages.push(_messages)
        }

    })

    it('Should success to find and delete a Room and all messages of room', async () => {
        const findRoom = await Room.findById(roomId);
        expect(findRoom).to.exist

        const findRoomMessages = await Message.find({ idRoom: roomId })
        expect(findRoomMessages).to.exist
        expect(findRoomMessages.length).to.equal(messages.length)

        await deleteRoom(roomId, idCreator)

        const _findRoom = await Room.findById(roomId);
        expect(_findRoom).to.be.null

        const [_findRoomMessages] = await Message.find({ idRoom: roomId })
        expect(_findRoomMessages).to.be.undefined
    })

    it('Should fail to delete a room with diferent idCreator ', async () => {
        const _user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        try {
            await deleteRoom(roomId, idCreator = _user._id.toString())
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('You can`t eliminate this room')
        }
    })
    it('Should fail to delete a enexistent room', async () => {
        await Room.deleteMany()
        try {
            await deleteRoom(roomId, idCreator)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('Does not exist room with this id')
        }
    })


    describe('Validate fields', () => {

        it('validate roomId', () => {
            const badIdRoom = `id${random()}`;

            expect(() => {
                deleteRoom(roomId = badIdRoom, idCreator)
            }).to.throw(TypeError, 'The roomId is not in a valid format')
        })
        it('validate idCreator', () => {
            const badIdCreator = `id${random()}`;

            expect(() => {
                deleteRoom(roomId, idCreator = badIdCreator)
            }).to.throw(TypeError, 'The idCreator is not in a valid format')
        })
        it('validate empty fields', () => {
            expect(() => {
                deleteRoom('', idCreator)
            }).to.throw(VoidError, 'string is empty or blank')
            expect(() => {
                deleteRoom(roomId, '')
            }).to.throw(VoidError, 'string is empty or blank')

        })
    })

    afterEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        await Message.deleteMany()
        messages = []
    })

    after(async () => {
        await mongoose.disconnect()
    })
})