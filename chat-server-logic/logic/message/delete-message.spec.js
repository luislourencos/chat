const { models: { Room, User, Message }, mongoose, mongoose: { ObjectId } } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const deleteMessage = require('./delete-message');


describe('Server Logic Delete Message', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let roomName, idCreator, idMessages = []
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
    })

    it('Should success to delete a Message', async () => {
        let index = Math.floor(Math.random() * (10 - 0))

        await deleteMessage(idMessages[index], idCreator);
        const _message = await Message.findById(idMessages[index])
        expect(_message).to.be.null;
    })

    it('Should fail to delete a message with another user', async () => {
        let index = Math.floor(Math.random() * (10 - 0))
        const _user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        idCreator = _user._id.toString()
        try {
            await deleteMessage(idMessages[index], idCreator);
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('You can`t eliminate this message')
        }

    })
    it('Should fail to delete a unexistent message ', async () => {
        let index = Math.floor(Math.random() * (10 - 0))
        await Message.findByIdAndDelete(idMessages[index])
        try {
            await deleteMessage(idMessages[index], idCreator);
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
                deleteMessage(badIdMessage, idCreator);
            }).to.throw(TypeError, 'The messageId is not in a valid format')
            const badIdCreator = `id${random()}`;
            expect(() => {
                deleteMessage(idMessages[0], badIdCreator);
            }).to.throw(TypeError, 'The userId is not in a valid format')
        })
        it('validate empty fileds', () => {


            expect(() => {
                deleteMessage('', idCreator);
            }).to.throw(VoidError, 'string is empty or blank')

            expect(() => {
                deleteMessage(idMessages[0], '');
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