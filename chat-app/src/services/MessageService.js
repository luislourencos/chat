import { get, post, put, remove } from './RestService';

export const getMessage = (roomId, messageId = '') => {
    return get(`message/roomId/${roomId}/messageId/${messageId}`)
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