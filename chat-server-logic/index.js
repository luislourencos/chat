module.exports = {
    // --- User Logic ----
    registerUser: require('./logic/user/register-user'),
    autheticateUser: require('./logic/user/authenticate-user'),
    getUsers: require('./logic/user/get-users'),
    //--- Room Logic -----
    createRoom: require('./logic/room/create-room'),
    getRoom: require('./logic/room/get-room'),
    updateRoom: require('./logic/room/update-room'),
    deleteRoom: require('./logic/room/delete-room'),
    //---- Message Logic ----
    createMessage: require('./logic/message/create-message'),
    getMessage: require('./logic/message/get-message'),
    updateMessage: require('./logic/message/update-message'),
    deleteMessage: require('./logic/message/delete-message'),
}