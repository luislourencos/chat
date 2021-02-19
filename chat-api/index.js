const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require('./src/swagger-options')
const { mongoose } = require('chat-data');
const userRoutes = require('./src/routes/user')
const roomRoutes = require('./src/routes/room')
const messageRoutes = require('./src/routes/message')
const parseBody = require('body-parser').json();
require('dotenv').config();
const { argv: [, , PORT_CLI], env: { PORT_ENV, PORT, MONGODB_URL, API_URL } } = process
const PORT_LISTEN = PORT_CLI || PORT || PORT_ENV || 8000
const socketIo = require('socket.io')

console.log('Connecting...')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Connected with Mongodb!!')
        const corsOptions = {
            origin: '*',
            credentials: true,            //access-control-allow-credentials:true
            optionSuccessStatus: 200
        }

        app.use(cors(corsOptions))
        app.use(cors())
        app.use(parseBody)
        //Routes
        app.use('/user', userRoutes);
        app.use('/room', roomRoutes);
        app.use('/message', messageRoutes);

        //Swager documentation
        const swaggerSpec = swaggerJSDoc(swaggerOptions);
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



        //HTTP server
        const server = http.createServer(app)
        const io = new socketIo.Server(server, corsOptions)

        //Socket
        let listConnectingUsers = {}
        io.on("connection", (socket) => {
            socket.on('connectingUser', ({ userName, userId, roomId }) => {
                if (listConnectingUsers[roomId] !== undefined) {
                    if (!listConnectingUsers[roomId].includes(userId))
                        listConnectingUsers[roomId].push(userId)
                } else {
                    listConnectingUsers[roomId] = [userId]
                }
                const listRoomUsers = listConnectingUsers[roomId]
                io.in(roomId).emit('connectingUser', { userName, userId, roomId, listRoomUsers })
                io.emit('listConnectingUsers', listConnectingUsers)
            })

            socket.emit('historicUsers', listConnectingUsers)

            socket.on('join_room', (roomId) => {
                socket.join(roomId);
            })

            socket.on('message', ({ message, roomId, userName, userId }) => {
                const date = new Date()
                socket.to(roomId).emit('message', { message, userName, userId, date })
            })

            socket.on('userDisconnect', ({ roomId, userName, userId }) => {
                const usersArray = listConnectingUsers[roomId];
                const filter = usersArray.filter((element) => element !== userId)
                listConnectingUsers[roomId] = filter
                const listRoomUsers = listConnectingUsers[roomId]
                io.in(roomId).emit('userDisconnect', { roomId, userName, userId, listRoomUsers })
                io.emit('listConnectingUsers', listConnectingUsers)
            })
        });

        server.listen(PORT_LISTEN, () => {
            console.log(`API run in ${API_URL}:${PORT_LISTEN}`)
        })
    })
    .catch((error) => {
        console.log(`Conection Failed!! with error: ${error.message}`)
    })