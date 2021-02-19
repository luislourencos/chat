import { ROOM_UPDATE, ROOM_CREATE, ROOM_DELETE, ROOM_GET } from '../actions/RoomActions'

const initialState = {
    room: [],
    fetch: false
}

export const room = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_CREATE:
            return { ...state, room: [...state.room, action.payload] }
        case ROOM_UPDATE:
            const updateRooms = state.room.map((room) => {
                if (room.id === action.payload.id) {
                    return room = action.payload
                }
                return room
            })
            return { ...state, room: updateRooms }
        case ROOM_DELETE:
            const rooms = state.room.filter((element => action.payload !== element.id))
            return { ...state, room: rooms }
        case ROOM_GET:
            return { ...state, room: action.payload, fetch: true }

        default:
            return state;
    }
}