import { types } from '../types/types';

export const uiOpenModal = () => ({
	type: types.UI_OPEN_NEW_REQUEST_MODAL
});

export const uiCloseModal = () => ({
	type: types.UI_CLOSE_NEW_REQUEST_MODAL
});

export const uiOpenSolModal = () => ({
	type: types.UI_OPEN_REQUEST_MODAL
});

export const uiCloseSolModal = () => ({
	type: types.UI_CLOSE_REQUEST_MODAL
});