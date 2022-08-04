import {
	ALL_MESSAGES_FAIL,
	ALL_MESSAGES_REQUEST,
	ALL_MESSAGES_SUCCESS,
	CONFIRM_MESSAGE_FAIL,
	CONFIRM_MESSAGE_REQUEST,
	CONFIRM_MESSAGE_SUCCESS,
	DELETE_MESSAGE_FAIL,
	DELETE_MESSAGE_REQUEST,
	DELETE_MESSAGE_SUCCESS,
	NEW_MESSAGE_FAIL,
	NEW_MESSAGE_REQUEST,
	NEW_MESSAGE_SUCCESS,
	SINGLE_MESSAGE_FAIL,
	SINGLE_MESSAGE_REQUEST,
	SINGLE_MESSAGE_SUCCESS,
} from "../constants/messageConstants";

export const messageCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_MESSAGE_REQUEST:
			return { loading: true };
		case NEW_MESSAGE_SUCCESS:
			return { loading: false, success: true, message: action.payload };
		case NEW_MESSAGE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const allMessagesReducer = (state = { messages: [] }, action) => {
	switch (action.type) {
		case ALL_MESSAGES_REQUEST:
			return { loading: true };
		case ALL_MESSAGES_SUCCESS:
			return { loading: false, messages: action.payload };
		case ALL_MESSAGES_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const singleMessageReducer = (state = { message: [] }, action) => {
	switch (action.type) {
		case SINGLE_MESSAGE_REQUEST:
			return { loading: true };
		case SINGLE_MESSAGE_SUCCESS:
			return { loading: false, message: action.payload };
		case SINGLE_MESSAGE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const deleteMessageReducer = (state = { isDeleted: false }, action) => {
	switch (action.type) {
		case DELETE_MESSAGE_REQUEST:
			return { loading: true };
		case DELETE_MESSAGE_SUCCESS:
			return { loading: false, isDeleted: action.payload.success };
		case DELETE_MESSAGE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const confirmMessageReducer = (state = { isUpdate: false }, action) => {
	switch (action.type) {
		case CONFIRM_MESSAGE_REQUEST:
			return { loading: true };
		case CONFIRM_MESSAGE_SUCCESS:
			return { loading: false, isUpdate: action.payload.success };
		case CONFIRM_MESSAGE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
