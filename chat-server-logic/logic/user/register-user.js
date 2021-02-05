const { models: { User } } = require('chat-data');
const { utils: { String, Email }, errors: { DuplicityError } } = require('chat-commons');
const bcrypt = require('bcryptjs')

module.exports = (name, email, password) => {
    //Validation field
    String.notVoid(name);
    String.notVoid(email);
    String.notVoid(password);
    String.validatePassword(password);
    Email.validate(email);

    return (async () => {
        // await User.deleteMany()
        const user = await User.findOne({ email: email })

        if (user) throw new DuplicityError(`This user is already register!`)

        const hash = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hash })
    })()
}
