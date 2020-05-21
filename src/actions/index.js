import { ActionTypes } from './actionTypes.js';

const action = (type, payload) => {
	return { type, ...payload}
}

export const createToken = (title, description, image) => {
	return {
		type: ActionTypes.CREATE_TOKEN,
		title,
		description,
		image
	};
};

export const loadMyAccountPage = () => {
	return action(ActionTypes.LOAD_MYACCOUNT_PAGE);
};

export const loadMyItemsPage = () => {
	return action(ActionTypes.LOAD_MYITEMS_PAGE);
};

export const loadBrowsePage = () => {
	return action(ActionTypes.LOAD_BROWSE_PAGE);
};

export const cancelCreateToken = () => {
	return action(ActionTypes.CREATE_TOKEN_CANCEL);
};

export const resetErrorMessage = () => {
	return action(ActionTypes.RESET_ERROR_MESSAGE);
};
