import { get, post, put, remove } from './RestService';

export const getRoom = (roomId) => {
    return get(`room/${roomId}`)
}
export const createRoom = async (name) => {
    return await post('room/', { name })
}

export const updateRoom = (roomId, name) => {
    return put(`room/`, { roomId, name })
}
export const deleteRoom = (roomId) => {
    return remove(`room/${roomId}`)
}