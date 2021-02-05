const { models: { User }, mongoose } = require('chat-data');
const { errors: { VoidError, FormatError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const registerUser = require('./register-user');
const bcrypt = require('bcryptjs')


describe('Server Logic Register User', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let name, email, password, match;
    beforeEach(async () => {
        await User.deleteMany();
        name = `name-${random()}`;
        email = `email${random()}@mail.com`;
        password = `password${random().toString().replace('.', '')}`
    })


    it('Success to register User', async () => {
        await registerUser(name, email, password);
        const user = await User.findOne({ email });

        expect(user).to.exist;
        expect(user.name).to.equal(name);
        expect(user.email).to.equal(email);
        match = await bcrypt.compare(password, user.password);
        expect(match).to.be.true;
    })

    it('Should fail to register a existent User', async () => {
        await User.create({ name, email, password })
        try {
            await registerUser(name, email, password);
        } catch (error) {
            expect(error).to.exist;
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal(`This user is already register!`)
        }
    })

    describe('Validation of fields', () => {
        it('name', () => {
            expect(() => {
                registerUser(name = '', email, password)
            }).to.throw(VoidError, 'string is empty or blank')
        })

        it('email wrong format', () => {
            _email = `${random()}@mail`
            expect(() => {
                registerUser(name, email = _email, password)
            }).to.throw(TypeError, `${_email} is not an e-mail`)
        })
        it('invalid password ', () => {
            expect(() => {
                registerUser(name, email, password = `${random}`)
            }).to.throw(FormatError, 'Need to have letter, numbers and at least 5 caracters!')
        })
    })

    afterEach(async () => {
        await User.deleteMany();
    })

    after(async () => {
        return await mongoose.disconnect()
    })
})