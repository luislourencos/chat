const { models: { Room, User, Message }, mongoose } = require('chat-data');
const { errors: { VoidError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const updateRoom = require('./update-room');


describe('Server Logic Delete Room', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let idCreator, roomId, name, newName
    beforeEach(async () => {
        await Room.deleteMany()
        await User.deleteMany()
        //create a user
        const user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        idCreator = user._id.toString()
        //create a room
        name = `name${random()}`;
        const room = await Room.create({ idCreator, name })
        roomId = room._id.toString()

        newName = `newName-${random()}`
    })

    it('Should success to find and update a Room name', async () => {

        await updateRoom(roomId, idCreator, newName)

        const findRoom = await Room.findById(roomId);
        expect(findRoom).to.exist
        expect(findRoom.name).to.equal(newName)
    })
    it('Should fail to find and update an unexistent Room', async () => {
        await Room.deleteMany()
        try {
            await updateRoom(roomId, idCreator, newName)

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`This room don't exist`)
        }

    })
    it('Should fail to update room with diferent idCreator', async () => {
        const _user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        try {
            await updateRoom(roomId, idCreator = _user._id.toString(), newName)

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('This room is not created by you')
        }

    })
    it('Should fail to update room with same name ', async () => {
        const _user = await User.create({ name: `name${random()}`, email: `email${random()}@mail.com`, password: `password${random().toString().replace('.', '')}` })
        try {
            await updateRoom(roomId, idCreator, name)

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`Allready exist one room with this ${name}`)
        }
    })



    describe('Validate fields', () => {

        it('validate roomId', () => {
            const badIdRoom = `id${random()}`;

            expect(() => {
                updateRoom(roomId = badIdRoom, idCreator, name)
            }).to.throw(TypeError, 'The roomId is not in a valid format')
        })
        it('validate idCreator', () => {
            const badIdCreator = `id${random()}`;

            expect(() => {
                updateRoom(roomId, idCreator = badIdCreator, name)
            }).to.throw(TypeError, 'The idCreator is not in a valid format')
        })
        it('validate empty fields', () => {
            expect(() => {
                updateRoom('', idCreator, name)
            }).to.throw(VoidError, 'string is empty or blank')
            expect(() => {
                updateRoom(roomId, '', name)
            }).to.throw(VoidError, 'string is empty or blank')
            expect(() => {
                updateRoom(roomId, idCreator, '')
            }).to.throw(VoidError, 'string is empty or blank')

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