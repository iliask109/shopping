import Axios from "axios";
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

export const createMessage = (message) => async (dispatch) => {
	dispatch({ type: NEW_MESSAGE_REQUEST, payload: message });
	try {
		const { data } = await Axios.post("/api/message", message);
		dispatch({ type: NEW_MESSAGE_SUCCESS, payload: data.message });
	} catch (error) {
		dispatch({
			type: NEW_MESSAGE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const allMessagesAdmin = () => async (dispatch) => {
	dispatch({ type: ALL_MESSAGES_REQUEST });
	try {
		const { data } = await Axios.get("/api/message");
		dispatch({ type: ALL_MESSAGES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ALL_MESSAGES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const detailsMessage = (messageId) => async (dispatch) => {
	dispatch({ type: SINGLE_MESSAGE_REQUEST, payload: messageId });

	try {
		const { data } = await Axios.get(`/api/message/${messageId}`);
		dispatch({ type: SINGLE_MESSAGE_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response.data.message;
		dispatch({ type: SINGLE_MESSAGE_FAIL, payload: message });
	}
};

export const deleteMessageAdmin = (messageId) => async (dispatch) => {
	dispatch({ type: DELETE_MESSAGE_REQUEST, payload: messageId });

	try {
		const { data } = await Axios.delete(`/api/message/${messageId}`);
		dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response.data.message;
		dispatch({ type: DELETE_MESSAGE_FAIL, payload: message });
	}
};

export const confirmMessageAdmin =
	(messageId, meg) =>
	async (dispatch) => {
		dispatch({ type: CONFIRM_MESSAGE_REQUEST, payload: messageId });

		try {
			const { data } = await Axios.put(`/api/message/${messageId}`, { meg });
			dispatch({ type: CONFIRM_MESSAGE_SUCCESS, payload: data });
		} catch (error) {
			const message = error.response.data.message;
			dispatch({ type: CONFIRM_MESSAGE_FAIL, payload: message });
		}
	};
