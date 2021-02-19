const { models: { Room, User, Message }, mongoose, mongoose: { ObjectId } } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const createMessage = require('./create-message');


describe('Server Logic Create Room', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let idCreator, roomName, roomId, messageCreate
    beforeEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        await Message.deleteMany()
        //create a user
        const user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        idCreator = user._id.toString()
        roomName = `roomName-${random()}`
        const room = await Room.create({ idCreator: ObjectId(idCreator), name: roomName })
        roomId = room._id.toString()

        // 
        // const message = await Message.create({idRoom:ObjectId(rooomId),idUser:ObjectId(idCreator),message:messageCreate})
        // idMessage = message._id.toString()
    })

    it('Should success to create a Message', async () => {
        messageCreate = `message${random()}`;
        await createMessage(roomId, idCreator, messageCreate);

        const messageDataBase = await Message.findOne({ idUser: ObjectId(idCreator) })
        expect(messageDataBase).to.exist
        expect(messageDataBase.message).to.equal(messageCreate)
    })


    describe('Validate fields', () => {
        it('invalidate roomId empty', () => {
            expect(() => {
                createMessage(roomId = `${random()}`, idCreator, messageCreate);
            }).to.throw(TypeError, 'The roomId is not a valid format')
        })
        it('invalidate idCreator empty', () => {
            expect(() => {
                createMessage(roomId, idCreator = `${random()}`, messageCreate);
            }).to.throw(TypeError, 'The idCreator is not a valid format')
        })
        it('invalidate fields', () => {
            expect(() => {
                createMessage('', idCreator, messageCreate);
            }).to.throw(VoidError, 'string is empty or blank')
            expect(() => {
                createMessage(roomId, '', messageCreate);
            }).to.throw(VoidError, 'string is empty or blank')
            expect(() => {
                createMessage(roomId, idCreator, '');
            }).to.throw(VoidError, 'string is empty or blank')

        })
    })

    afterEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        await Message.deleteMany()
    })

    after(async () => {
        await mongoose.disconnect()
    })
})