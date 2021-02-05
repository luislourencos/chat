const { models: { User }, mongoose } = require('chat-data');
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const bcrypt = require('bcryptjs')
const getUsers = require('./get-users');



describe('Server Logic Register User', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })


    let name, email, password, hash, usersCreated = [], user
    beforeEach(async () => {
        await User.deleteMany();
        for (let i = 0; i < 10; i++) {
            name = `name-${random()}`;
            email = `email${random()}@mail.com`;
            password = `password${random().toString().replace('.', '')}`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, email, password: hash })
            usersCreated.push(user._id.toString())
        }
    })

    it('Success to retrive 1 user', async () => {
        let index = Math.floor(Math.random() * (10 - 0))

        const user = await getUsers(usersCreated[index]);
        expect(user).to.exist;
        expect(user.length).to.equal(1);
        const [{ id }] = user
        expect(id).to.equal(usersCreated[index]);
    })

    it('Success to retrive many users', async () => {
        const users = await getUsers();
        expect(users).to.exist;
        expect(users.length).to.equal(usersCreated.length);
        users.forEach((_user, index) => {
            expect(_user.id).to.equal(usersCreated[index])
        })
    })

    it('Should fail to put a incorrect userId', async () => {
        let userId = `${random()}`
        try {
            await getUsers(userId)
        } catch (error) {
            expect(error).to.exist;
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('The format ID is not correct')
        }
    })

    it('Should fail to search a enxistent userId', async () => {
        const _name = `name-${random()}`;
        const _email = `email${random()}@mail.com`;
        const _password = `password${random().toString().replace('.', '')}`
        const _hash = await bcrypt.hash(_password, 10)
        const _user = await User.create({ name: _name, email: _email, password: _hash })
        //delete user
        await User.deleteOne({ email: _email })

        try {
            await getUsers(_user._id.toString())
        } catch (error) {
            expect(error).to.exist;
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('This user don`t exist')
        }
    })

    it('Should fail find a users with a empty database', async () => {
        await User.deleteMany();
        try {
            await getUsers()
        } catch (error) {
            expect(error).to.exist;
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('No users in database')
        }
    })


    afterEach(async () => {
        await User.deleteMany();
        usersCreated = []
    })

    after(async () => {
        return await mongoose.disconnect()
    })
})