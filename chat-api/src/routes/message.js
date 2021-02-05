require('dotenv').config()
const { env: { SECRET } } = process
const errorHandler = require('../helpers/error-handler')
const router = require('express').Router();
const { getMessage, createMessage, updateMessage, deleteMessage } = require('chat-server-logic')
const { utils: { jwtPromised: jwt } } = require('chat-commons')
const jwtExtractor = require('../middleware/jwt-verifier-extractor')(SECRET, errorHandler)

//import body parser

router.get('/roomId/:roomId/messageId/:messageId?', jwtExtractor, async (req, res) => {
    try {
        const { params: { roomId, messageId } } = req
        getMessage(roomId, messageId)
            .then((users) => res.status(200).json(users))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})

router.post('/', jwtExtractor, (req, res) => {
    try {
        const { body: { roomId, message }, payload: { id: idCreator } } = req
        //TODO Extract idcreator from payload
        createMessage(roomId, idCreator, message)
            .then((room) => res.status(201).json(room))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})
router.patch('/', jwtExtractor, async (req, res) => {
    try {
        const { body: { messageId, message }, payload: { id: idCreator } } = req
        updateMessage(messageId, idCreator, message)
            .then((message) => res.status(201).json(message))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})
router.delete('/:messageId', jwtExtractor, async (req, res) => {
    try {
        const { params: { messageId }, payload: { id: idCreator } } = req

        deleteMessage(messageId, idCreator)
            .then(() => res.status(201).json({ message: "message deleted" }))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})

module.exports = router