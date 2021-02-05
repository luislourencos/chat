const { models: { User }, mongoose: { ObjectId } } = require('chat-data');
const { errors: { UnexistenceError } } = require('chat-commons');



module.exports = (userId) => {
    console.log(userId)
    return (async () => {
        if (userId) {
            console.log('enter')
            if (!ObjectId.isValid(userId)) throw new TypeError('The format ID is not correct');

            const user = await User.findOne({ _id: ObjectId(userId) })
            if (!user) throw new UnexistenceError('This user don`t exist')

            return [{
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }]
        } else {
            const users = await User.find({});

            if (users.length === 0) throw new UnexistenceError('No users in database');
            const sanitiseUsers = users.map((user) => {
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }
            })
            return sanitiseUsers
        }
    })()
}