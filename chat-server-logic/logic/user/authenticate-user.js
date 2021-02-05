const { models: { User } } = require('chat-data');
const { utils: { String, Email }, errors: { UnexistenceError, CredentialsError } } = require('chat-commons');
const bcrypt = require('bcryptjs')


module.exports = (email, password) => {
    String.notVoid(email);
    String.notVoid(password);
    String.validatePassword(password);
    Email.validate(email);

    return (async () => {
        const user = await User.findOne({ email });

        if (!user) throw new UnexistenceError(`This user isn't register`)

        const hash = await bcrypt.compare(password, user.password)

        if (!hash) throw new CredentialsError(`Incorrect password`)

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        }
    })()
}