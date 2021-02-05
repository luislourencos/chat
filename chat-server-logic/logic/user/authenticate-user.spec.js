const { models: { User }, mongoose } = require('chat-data');
const { errors: { VoidError, FormatError } } = require('chat-commons')
const { expect } = require('chai');
require('dotenv').config();
const { env: { MONGODB_URL } } = process
const { random } = Math;
const bcrypt = require('bcryptjs')
const authenticateUser = require('./authenticate-user');



describe('Server Logic Authenticate User', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL)
    })

    let name, email, password, hash, userCreated
    beforeEach(async () => {
        await User.deleteMany();
        name = `name-${random()}`;
        email = `email${random()}@mail.com`;
        password = `password${random().toString().replace('.', '')}`
        hash = await bcrypt.hash(password, 10)
        userCreated = await User.create({ name, email, password: hash })

    })


    it('Success to authenticate User', async () => {
        const user = await authenticateUser(email, password);
        expect(user).to.exist;
        expect(user.id).to.equal(userCreated._id.toString());
        expect(user.name).to.equal(userCreated.name);
        expect(user.email).to.equal(userCreated.email);
    })

    it('Should fail to authenticate user with a diferent email', async () => {
        const _email = `email-${random()}@mail.com`

        try {
            await authenticateUser(email = _email, password);
        } catch (error) {
            expect(error).to.exist;
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal("This user isn't register")
        }
    })
    it('Should fail to authenticate user with a wrong password', async () => {
        const _password = `password${random().toString().replace('.', '')}`
        try {
            await authenticateUser(email, password = _password);
        } catch (error) {
            expect(error).to.exist;
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal(`Incorrect password`)
        }
    })

    describe('Validation of fields', () => {
        it('empty fields', () => {
            expect(() => {
                authenticateUser(email = '', password)
            }).to.throw(VoidError, 'string is empty or blank')
            expect(() => {
                authenticateUser(email, password = '')
            }).to.throw(VoidError, 'string is empty or blank')
        })

        it('email wrong format', () => {
            const notEmail = `${random()}@mail`
            expect(() => {
                authenticateUser(email = notEmail, password)
            }).to.throw(TypeError, `${notEmail} is not an e-mail`)
        })
        it('invalid password', () => {
            expect(() => {
                authenticateUser(email, password = `${random}`)
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