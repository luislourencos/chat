import { USER_LOGIN, USER_LOGOUT, USER_ISAUTH } from '../actions/UserActions';



const initialState = {
    user: {},
    isAuth: false
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, user: action.payload, isAuth: true };
        case USER_ISAUTH:
            return { ...state, user: action.payload.user, isAuth: action.payload.isAuth };
        case USER_LOGOUT:
            return state = [];

        default:
            return state;
    }
}