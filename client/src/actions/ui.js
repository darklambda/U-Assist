import { types } from '../types/types';

export const uiOpenModal = () => ({
	type: types.UI_OPEN_NEW_REQUEST_MODAL
});

export const uiCloseModal = () => ({
	type: types.UI_CLOSE_NEW_REQUEST_MODAL
});

export const uiOpenSolModal = (data) => ({
	type: types.UI_OPEN_REQUEST_MODAL,
	payload: data
});

export const uiCloseSolModal = () => ({
	type: types.UI_CLOSE_REQUEST_MODAL
});

export const uiOpenViewModal = (data) => ({
	type: types.UI_OPEN_VIEW_MODAL,
	payload: data
});

export const uiCloseViewModal = () => ({
	type: types.UI_CLOSE_VIEW_MODAL,
});

export const uiOpenClientViewModal = (data) => ({
	type: types.UI_OPEN_CLIENT_MODAL,
	payload: data
});

export const uiCloseClientViewModal = () => ({
	type: types.UI_CLOSE_CLIENT_MODAL
});

export const uiOpenScoreModal = (data) => ({
	type: types.UI_OPEN_SCORE_MODAL,
	payload: data
})

export const uiCloseScoreModal = () => ({
	type: types.UI_CLOSE_SCORE_MODAL
})