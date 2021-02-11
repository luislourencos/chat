import { combineReducers } from "redux";
import { alerts } from './AlertReducer';
import { user } from './UserReducer';
import { room } from './RoomReducer'

export default combineReducers({
    alerts,
    user,
    room,
});