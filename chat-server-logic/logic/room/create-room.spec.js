const { models: { Room, User }, mongoose } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const createRoom = require('./create-room');


describe('Server Logic Create Room', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })
    let name, idCreator
    beforeEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        //create a user
        const user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        idCreator = user._id.toString()
        name = `roomName${random()}`
    })

    it('Should success to create a Room', async () => {
        await createRoom(idCreator, name);
        const roomDataBase = await Room.findOne({ name: name })
        expect(roomDataBase).to.exist
        expect(roomDataBase.name).to.equal(name)
    })

    it('Should fail to create a Room with a existent name', async () => {
        await Room.create({ idCreator, name })
        try {

            await createRoom(idCreator, name)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`Allready exist one room with this ${name}`)
        }
    })

    describe('Validate fields', () => {
        it('validate idCreator empty', () => {
            expect(() => {
                createRoom(idCreator = '', name)
            }).to.throw(VoidError, 'string is empty or blank')
        })
        it('validate name empty', () => {
            expect(() => {
                createRoom(idCreator, name = '')
            }).to.throw(VoidError, 'string is empty or blank')
        })
        it('validate id of idCreator', () => {
            expect(() => {
                createRoom(idCreator = `${random()}`, name)
            }).to.throw(TypeError, 'The idCreator is not a valid format')
        })
    })

    afterEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
    })

    after(async () => {
        await mongoose.disconnect()
    })
})