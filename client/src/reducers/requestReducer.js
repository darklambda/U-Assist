import { types } from "../types/types";

const initialState = {
	requests: [],
	activeRequest: null
};

export const requestReducer = (state=initialState, action ) => {
	switch (action.type) {
		case types.REQUEST_SET_ACTIVE:
			return {
				...state,
				activeRequest: action.payload
			}
		case types.REQUEST_CREATION:
			return {
				...state,
				requests: [
					...state.requests,
					action.payload
				]
			}
		case types.REQUEST_LOADED:
			return {
				...state,
				requests: [
					...state.requests,
					action.payload
				]
			}	
		default:
			return state;
	}
}