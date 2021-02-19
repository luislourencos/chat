require('dotenv').config()
const { env: { SECRET } } = process
const errorHandler = require('../helpers/error-handler')
const express = require('express');
const router = express.Router();
const { registerUser, autheticateUser, getUsers } = require('chat-server-logic')
const { utils: { jwtPromised: jwt } } = require('chat-commons')
const jwtExtractor = require('../middleware/jwt-verifier-extractor')(SECRET, errorHandler)



router.get('/get/:userId?', jwtExtractor, async (req, res) => {
    try {
        const { params: { userId } } = req

        getUsers(userId)
            .then((users) => res.status(200).json(users))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})

/**
 * @swagger
 * /register:
*   get:
*         summary: Adds a new user
*         requestBody:
*           description: Optional description in *Markdown*
*           required: true
*           content:
*             application/json:
*               schema:      # Request body contents
*                 type: object
*                 properties:
*                   name:
*                     type: string
*                   email:
*                     type: string
*                   password:
*                     type: string
*                 example:   # Sample object
*                   name: "Name"
*                   email: "emai@mail.com"
*                   password: "t12345"
*         responses:
*           '201':
*             description: user Created
*/


router.post('/register', (req, res) => {
    try {
        const { body: { name, email, password } } = req
        registerUser(name, email, password)
            .then(() => res.status(201).json({ message: 'user created!' }))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})
/**
 * @swagger
 * /authenticate:
 *  post:
 *    description: Use authenticate
 *    responses:
 *      '201':
 *        description: A successful response
 */

router.post('/authenticate', async (req, res) => {
    try {
        const { body: { email, password } } = req
        autheticateUser(email, password)
            .then((user) => jwt.sign(user, SECRET, { expiresIn: '30d' }))
            .then((token) => res.status(200).json({ token }))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})

module.exports = router



/**
* @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
*/
