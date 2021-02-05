const { models: { Room, User, Message }, mongoose, mongoose: { ObjectId } } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const getMessage = require('./get-message');


describe('Server Logic Get Message', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let roomName, idCreator, idMessages = [], userName
    beforeEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        await Message.deleteMany()

        //create a user
        userName = `name${random()}`
        const user = await User.create({ name: userName, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
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

    it('Should success to get one Message', async () => {
        let index = Math.floor(Math.random() * (10 - 0))
        const _message = await getMessage(roomId, idMessages[index]);
        expect(_message).to.exist
        expect(_message.length).to.equal(1);

        const [{ id, idUser: { name } }] = _message
        expect(id).to.equal(idMessages[index])
        expect(name).to.equal(userName)
    })

    it('Should success to all Room Messages', async () => {
        const _messages = await getMessage(roomId);

        expect(_messages).to.exist
        expect(_messages.length).to.equal(idMessages.length)
        _messages.forEach((messages, index) => {
            expect(messages.id).to.equal(idMessages[index])
        })
    })
    it('Should fail to don`t find a message with an a inexistent id', async () => {
        index = Math.floor(Math.random() * (10 - 0))
        await Message.findByIdAndDelete(idMessages[index])
        try {
            await getMessage(roomId, idMessages[index]);

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('Does not exist message with this id')
        }
    })
    it('Should fail to don`t find a message room with an a inexistent id', async () => {
        index = Math.floor(Math.random() * (10 - 0))

        await Room.findByIdAndDelete(roomId)
        try {
            await getMessage(roomId, idMessages[index]);
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('Does not exist room with this id')
        }
    })
    it('Should fail to don`t find a message room with', async () => {
        index = Math.floor(Math.random() * (10 - 0))

        await Message.deleteMany()
        try {
            await getMessage(roomId);
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal('Does not exist messages in this room')
        }
    })


    describe('Validate fields', () => {

        it('validate bad format', () => {
            const badIdRoom = `id${random()}`;
            expect(() => {
                getMessage(badIdRoom, idMessages[index]);
            }).to.throw(TypeError, 'The roomId is not in a valid format')
            const badIdMessage = `id${random()}`;
            expect(() => {
                getMessage(roomId, badIdMessage);
            }).to.throw(TypeError, 'The messageId is not in a valid format')
        })
        it('validate empty fileds', () => {


            expect(() => {
                getMessage('', idMessages[index]);
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