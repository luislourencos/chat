import { createRoom, updateRoom, deleteRoom, getRoom } from '../services/RoomService'
export const ROOM_CREATE = "ROOM_CREATE";
export const ROOM_UPDATE = "ROOM_UPDATE";
export const ROOM_DELETE = "ROOM_DELETE";
export const ROOM_GET = "ROOM_GET";



export const actionCreateRoom = (name, theme) => async (dispatch) => {
    const room = await createRoom(name, theme)
    dispatch({ type: ROOM_CREATE, payload: room });
}


export const actionUpdateRoom = (roomId, name) => async (dispatch) => {
    const room = await updateRoom(roomId, name)
    dispatch({ type: ROOM_UPDATE, payload: room });
}
export const actionDeleteRoom = (roomId) => async (dispatch) => {
    await deleteRoom(roomId)
    dispatch({ type: ROOM_DELETE, payload: roomId });
}
export const actionGetRoom = (roomId = '') => async (dispatch) => {
    const rooms = await getRoom(roomId);
    dispatch({ type: ROOM_GET, payload: rooms });
}
