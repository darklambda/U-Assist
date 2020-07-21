import { types } from "../types/types";

const initialState =  {
	isOpen: false,
	isSolOpen: false
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
				isSolOpen: true
			}
		case types.UI_CLOSE_REQUEST_MODAL:
			return {
				...state,
				isSolOpen: false
			}
		default:
			return state;
	}

}
