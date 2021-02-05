const fs = require('fs')
const app = require('express')();
const http = require('http')
const cors = require('cors');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require('./swagger-options')
const { mongoose } = require('chat-data');
const userRoutes = require('./routes/user')
const roomRoutes = require('./routes/room')
const messageRoutes = require('./routes/message')
const parseBody = require('body-parser').json();
require('dotenv').config();
const { env: { PORT, MONGODB_URL, API_URL } } = process
const socketIo = require('socket.io')


const io = new socketIo.Server(http, {
    cors: {
        origin: "*",
        credentials: true
    }
})

console.log('Connecting...')

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Connected with Mongodb!!')
        app.use(cors({
            credentials: true,
        }))
        app.use(parseBody)
        //Routes
        app.use('/user', userRoutes);
        app.use('/room', roomRoutes);
        app.use('/message', messageRoutes);

        //Swager documentation
        const swaggerSpec = swaggerJSDoc(swaggerOptions);
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        //Socket
        io.on("connection", (socket) => {
            console.log(socket.id)
            socket.emit('userId', socket.id)


            socket.on('join_room', (roomId) => {
                console.log('join_room', roomId)
                socket.join(roomId);
            })

            socket.on('message', ({ message, roomId, userId }) => {
                console.log('romId and message:', { roomId, message })
                socket.to(roomId).emit('message', { message, userId })
            })

            socket.on('disconnect', () => {
                console.log('User disconnect')
            })
        });

        //HTTP server
        const server = http.createServer(app, (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Request-Method', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET,POST,PUT');
            res.setHeader('Access-Control-Allow-Headers', '*');
        });

        server.listen(PORT, () => {
            console.log(`API run in ${API_URL}:${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Conection Failed!! with error: ${error.message}`)
    })