import { types } from "../types/types";

const initialState = {
	requests: [],
	activeRequest: [],
	updatedRequest: []
};

export const requestReducer = (state=initialState, action ) => {
	switch (action.type) {
		case types.REQUEST_SET_ACTIVE:
			return {
				...state,
				activeRequest: [...state.requests, action.payload]
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
		case types.REQUEST_UPDATED:
			return {
				...state,
				updatedRequest: [
					...state.updatedRequest,
					action.payload
				]
			}	
		case types.REQUEST_SCORE:
			return {
				...state,
				scores: [
					action.payload
				]
			}
		default:
			return state;
	}
}