import { get, post, put, remove } from './RestService';

export const getMessage = async (roomId, messageId = '') => {
    const { data } = await get(`message/roomId/${roomId}/messageId/${messageId}`)
    const _data = data.map(element => {
        return { ...element, userName: element.idUser.name, userId: element.idUser._id }
    })
    return _data
}
export const createMessage = async (roomId, message) => {
    return await post('message/', { roomId, message })
}

export const updateMessage = (messageId, message) => {
    return put(`message/`, { messageId, message })
}
export const deleteMessage = (messageId) => {
    return remove(`message/${messageId}`)
}