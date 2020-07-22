import { types } from "../types/types";

const initialState =  {
	isOpen: false,
	isSolOpen: false,
	solRequest: null,
	isViewOpen: false,
	currentRequest: null
}

export const uiReducer = ( state=initialState, action) => {

	switch (action.type) {
		case types.UI_OPEN_NEW_REQUEST_MODAL:
			return {
				...state,
				isOpen: true
			}
		case types.UI_CLOSE_NEW_REQUEST_MODAL:
			return {
				...state,
				isOpen: false
			}
		case types.UI_OPEN_REQUEST_MODAL:
			return {
				...state,
				isSolOpen: true,
				solRequest: action.payload
			}
		case types.UI_CLOSE_REQUEST_MODAL:
			return {
				...state,
				isSolOpen: false,
				solRequest: null
			}
		case types.UI_OPEN_VIEW_MODAL:
			return {
				...state,
				isViewOpen: true,
				currentRequest: action.payload
			}
		case types.UI_CLOSE_VIEW_MODAL:
			return {
				...state,
				isViewOpen: false,
				currentRequest: null
			}
		default:
			return state;
	}

}
