import { createRoom, updateRoom, deleteRoom, getRoom } from '../services/RoomService'
export const ROOM_CREATE = "ROOM_CREATE";
export const ROOM_UPDATE = "ROOM_UPDATE";
export const ROOM_DELETE = "ROOM_DELETE";
export const ROOM_GET = "ROOM_GET";



export const actionCreateRoom = (name) => async (dispatch) => {
    const room = await createRoom(name)
    dispatch({ type: ROOM_CREATE, payload: room });
}


export const actionUpdateRoom = (roomId, name) => async (dispatch) => {
    const room = await updateRoom(roomId, name)
    dispatch({ type: ROOM_UPDATE, payload: room });
}
export const actionDeleteRoom = (roomId) => async (dispatch) => {
    debugger
    await deleteRoom(roomId)
    dispatch({ type: ROOM_DELETE, payload: roomId });
}
export const actionGetRoom = (roomId = '') => async (dispatch) => {
    const rooms = await getRoom(roomId);
    dispatch({ type: ROOM_GET, payload: rooms });
}


// export const USER_LOGIN = "USER_LOGIN";
// export const USER_LOGOUT = "USER_LOGOUT";
// export const USER_ISAUTH = "USER_ISAUTH";


// export const userLogin = (email, password) => async (dispatch) => {
//     const token = await authenticate(email, password)
//     localStorage.setItem('token', token)

//     var decoded = jwt.verify(token, REACT_APP_SECRET);
//     if (decoded) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     }
//     dispatch({ type: USER_LOGIN, payload: decoded });
// }