import { get, post, put, remove } from './RestService';

export const getRoom = async (roomId = '') => {
    const { data } = await get(`room/${roomId}`)
    return data
}
export const createRoom = async (name, theme) => {
    debugger
    const { data } = await post('room/', { name, theme })
    return data
}

export const updateRoom = async (roomId, name) => {
    const { data } = await put('room/', { roomId, name })
    return data
}
export const deleteRoom = async (roomId) => {
    return await remove(`room/${roomId}`)
}