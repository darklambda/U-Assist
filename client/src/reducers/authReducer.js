import { types } from '../types/types';

const initialState = {
    checking: true
}

export const authReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
        case types.AUTH_CHECKED:
            return {
                ...state,
                checking: false
            }
        default:
            return state;
    }
}