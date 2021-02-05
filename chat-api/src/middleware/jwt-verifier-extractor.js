const { utils: { jwtPromised: jwt } } = require('chat-commons')

module.exports = (secret, errorHandler) =>
    (req, res, next) => {
        try {
            const [, token] = req.header('authorization').split(' ')

            console.log(token)
            jwt.verify(token, secret)
                .then(payload => {
                    req.payload = payload
                    next()
                })
                .catch(error => errorHandler(error, res))
        } catch (error) {
            errorHandler(error, res)
        }
    }