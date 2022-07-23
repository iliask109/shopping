import Axios from "axios";

import {
	ALL_USERS_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	CLEAR_ERRORS,
	CREATE_FAVORITE_FAIL,
	CREATE_FAVORITE_REQUEST,
	CREATE_FAVORITE_SUCCESS,
	DELETE_FAVORITE_FAIL,
	DELETE_FAVORITE_REQUEST,
	DELETE_FAVORITE_SUCCESS,
	DELETE_USER_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	USER_DETAILS_ADMIN_FAIL,
	USER_DETAILS_ADMIN_REQUEST,
	USER_DETAILS_ADMIN_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNOUT,
	USER_UPDATE_PASSWORD_FAIL,
	USER_UPDATE_PASSWORD_REQUEST,
	USER_UPDATE_PASSWORD_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const register = (name, email, password) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
	try {
		const { data } = await Axios.post("/api/auth/register", {
			name,
			email,
			password,
		});
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signin = (email, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
	try {
		const { data } = await Axios.post("/api/auth/login", { email, password });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	localStorage.removeItem("shippingAddress");
	dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
	dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await Axios.get(`/api/user/${userId}`, {
			headers: { Authorization: `Bearer ${userInfo?.token}` },
		});
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: USER_DETAILS_FAIL, payload: message });
	}
};

export const ForgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const { data } = await Axios.post("/api/auth/password/forgot", { email });

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateUserPassword = (password) => async (dispatch, getState) => {
	dispatch({ type: USER_UPDATE_PASSWORD_REQUEST, payload: password });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await Axios.put(`/api/user/password/update`, password, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload: message });
	}
};
export const updateUserProfile = (user) => async (dispatch, getState) => {
	dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await Axios.put(`/api/user/update`, user, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
	}
};

export const allUsersAdmin = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_USERS_REQUEST });

		const { data } = await Axios.get("/api/admin/users");

		dispatch({
			type: ALL_USERS_SUCCESS,
			payload: data.users,
		});
	} catch (error) {
		dispatch({
			type: ALL_USERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getUserDetailsAdmin = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_ADMIN_REQUEST });

		const { data } = await Axios.get(`/api/admin/user/${id}`);

		dispatch({
			type: USER_DETAILS_ADMIN_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_ADMIN_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateUserAdmin = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await Axios.put(`/api/admin/user/${id}`, userData, config);

		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_USER_REQUEST });

		const { data } = await Axios.delete(`/api/admin/user/${id}`);

		dispatch({
			type: DELETE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const createFavorite = (productId) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_FAVORITE_REQUEST });
		const {
			userSignin: { userInfo },
		} = getState();

		const { data } = await Axios.put(
			`/api/user/favorite`,
			{ productId },
			{
				headers: { Authorization: `Bearer ${userInfo?.token}` },
			}
		);

		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));

		dispatch({
			type: CREATE_FAVORITE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: CREATE_FAVORITE_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteFavoriteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_FAVORITE_REQUEST });
		const {
			userSignin: { userInfo },
		} = getState();

		const { data } = await Axios.delete(`/api/user/favorite/${id}`, {
			headers: { Authorization: `Bearer ${userInfo?.token}` },
		});

		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user });

		dispatch({
			type: DELETE_FAVORITE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_FAVORITE_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
