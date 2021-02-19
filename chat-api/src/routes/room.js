require('dotenv').config()
const { env: { SECRET } } = process
const errorHandler = require('../helpers/error-handler')
const router = require('express').Router();
const { getRoom, createRoom, updateRoom, deleteRoom } = require('chat-server-logic')
const { utils: { jwtPromised: jwt } } = require('chat-commons')
const jwtExtractor = require('../middleware/jwt-verifier-extractor')(SECRET, errorHandler)

//import body parser

router.get('/:roomId?', jwtExtractor, async (req, res) => {
    try {
        const { params: { roomId } } = req
        getRoom(roomId)
            .then((users) => res.status(200).json(users))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})

router.post('/', jwtExtractor, (req, res) => {
    try {
        const { body: { name, theme }, payload: { id: idCreator } } = req
        //TODO Extract idcreator from payload

        createRoom(idCreator, name, theme)
            .then((room) => res.status(201).json(room))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})
router.put('/', jwtExtractor, async (req, res) => {
    try {
        const { body: { roomId, name }, payload: { id: idCreator } } = req

        updateRoom(roomId, idCreator, name)
            .then((room) => res.status(201).json(room))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})
router.delete('/:roomId?', jwtExtractor, async (req, res) => {
    try {
        const { params: { roomId }, payload: { id: idCreator } } = req
        deleteRoom(roomId, idCreator)
            .then(() => res.status(201).json({ message: "room deleted" }))
            .catch((error) => errorHandler(error, res))
    } catch (error) {
        errorHandler(error, res)
    }
})

module.exports = router