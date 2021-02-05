const { models: { Room, User, Message }, mongoose, mongoose: { ObjectId } } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const updateMessage = require('./update-message');


describe('Server Logic Update Message', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let roomName, idCreator, idMessages = [], newMessage
    beforeEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        await Message.deleteMany()

        //create a user
        const user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        idCreator = user._id.toString()
        //create a room
        roomName = `roomName-${random()}`
        const room = await Room.create({ idCreator: ObjectId(idCreator), name: roomName })
        roomId = room._id.toString()
        //create Messages
        for (let i = 0; i < 10; i++) {
            let message = `roomName${random()}`
            const _message = await Message.create({ idRoom: roomId, idUser: idCreator, message: message })
            idMessages.push(_message._id.toString())
        }
        newMessage = `newMessage${random()}`
    })

    it('Should success to update a Message', async () => {
        let index = Math.floor(Math.random() * (10 - 0))

        await updateMessage(idMessages[index], idCreator, newMessage);
        const _message = await Message.findById(idMessages[index])
        expect(_message.message).to.be.equal(newMessage);
    })

    it('Should fail to update a message with another user', async () => {
        let index = Math.floor(Math.random() * (10 - 0))
        const _user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })

        idCreator = _user._id.toString()
        try {
            await updateMessage(idMessages[index], idCreator, newMessage);
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('You can`t update this message')
        }

    })
    it('Should fail to delete a unexistent message ', async () => {
        let index = Math.floor(Math.random() * (10 - 0))
        await Message.findByIdAndDelete(idMessages[index])
        try {
            await updateMessage(idMessages[index], idCreator, newMessage);
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('Does not exist message with this id')
        }
    })

    describe('Validate fields', () => {

        it('validate bad format', () => {
            const badIdMessage = `id${random()}`;
            expect(() => {
                updateMessage(badIdMessage, idCreator, newMessage);
            }).to.throw(TypeError, 'The messageId is not in a valid format')
            const badIdCreator = `id${random()}`;
            expect(() => {
                updateMessage(idMessages[0], badIdCreator, newMessage);
            }).to.throw(TypeError, 'The userId is not in a valid format')
        })
        it('validate empty fileds', () => {


            expect(() => {
                updateMessage('', idCreator, newMessage);
            }).to.throw(VoidError, 'string is empty or blank')

            expect(() => {
                updateMessage(idMessages[0], '', newMessage);
            }).to.throw(VoidError, 'string is empty or blank')
            expect(() => {
                updateMessage(idMessages[0], idCreator, '');
            }).to.throw(VoidError, 'string is empty or blank')
        })
    })

    afterEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        await Message.deleteMany()
        idMessages = []
    })

    after(async () => {
        await mongoose.disconnect()
    })
})