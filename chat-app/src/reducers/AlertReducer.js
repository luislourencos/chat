import { ALERT_CREATE, ALERT_REMOVE } from '../actions/AlertActions';



const initialState = [];

export const alerts = (state = initialState, action) => {
    switch (action.type) {
        case ALERT_CREATE:
            return [...state, action.payload];

        case ALERT_REMOVE:
            return state.filter(alert => alert.id !== action.payload);

        default:
            return state;
    }
}