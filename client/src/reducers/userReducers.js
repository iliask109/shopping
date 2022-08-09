import {
	ALL_USERS_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	CLEAR_ERRORS,
	CREATE_FAVORITE_FAIL,
	CREATE_FAVORITE_REQUEST,
	CREATE_FAVORITE_SUCCESS,
	CREATE_LIKE_FAIL,
	CREATE_LIKE_REQUEST,
	CREATE_LIKE_SUCCESS,
	DELETE_FAVORITE_FAIL,
	DELETE_FAVORITE_REQUEST,
	DELETE_FAVORITE_SUCCESS,
	DELETE_LIKE_FAIL,
	DELETE_LIKE_REQUEST,
	DELETE_LIKE_SUCCESS,
	DELETE_USER_REQUEST,
	DELETE_USER_RESET,
	DELETE_USER_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	NEW_PASSWORD_FAIL,
	NEW_PASSWORD_REQUEST,
	NEW_PASSWORD_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_RESET,
	UPDATE_USER_SUCCESS,
	USER_DETAILS_ADMIN_FAIL,
	USER_DETAILS_ADMIN_REQUEST,
	USER_DETAILS_ADMIN_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_DETAILS_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_RESET,
	USER_REGISTER_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_RESET,
	USER_SIGNIN_SUCCESS,
	USER_SIGNOUT,
	USER_UPDATE_PASSWORD_FAIL,
	USER_UPDATE_PASSWORD_REQUEST,
	USER_UPDATE_PASSWORD_RESET,
	USER_UPDATE_PASSWORD_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_RESET,
	USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		case USER_REGISTER_RESET:
			return {};

		default:
			return state;
	}
};

export const userSigninReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SIGNIN_REQUEST:
			return { loading: true };
		case USER_SIGNIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_SIGNIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_SIGNIN_RESET:
			return {};
		case USER_SIGNOUT:
			return {};
		default:
			return state;
	}
};

export const userDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			return {};
		default:
			return state;
	}
};

export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, isUpdate: true, user: action.payload };
		case USER_UPDATE_PROFILE_FAIL:
			return { loading: false, error: action.payload };
		case USER_UPDATE_PROFILE_RESET:
			return {};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const userUpdatePasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PASSWORD_REQUEST:
			return { loading: true };
		case USER_UPDATE_PASSWORD_SUCCESS:
			return { loading: false, isUpdate: true };
		case USER_UPDATE_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		case USER_UPDATE_PASSWORD_RESET:
			return {};
		default:
			return state;
	}
};

export const allUsersReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case ALL_USERS_REQUEST:
			return { loading: true };
		case ALL_USERS_SUCCESS:
			return { loading: false, users: action.payload };
		case ALL_USERS_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const userDetailsAdminReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_ADMIN_REQUEST:
			return { loading: true };
		case USER_DETAILS_ADMIN_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_ADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const userUpdateAdminReducer = (
	state = { loading: true, isUpdate: false },
	action
) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
			return { loading: true };
		case UPDATE_USER_SUCCESS:
			return { loading: false, isUpdate: true };
		case UPDATE_USER_FAIL:
			return { loading: false, error: action.payload };
		case UPDATE_USER_RESET:
			return {};

		default:
			return state;
	}
};
export const userDeleteAdminReducer = (
	state = { isDeleted: false },
	action
) => {
	switch (action.type) {
		case DELETE_USER_REQUEST:
			return { loading: true };
		case DELETE_USER_SUCCESS:
			return { loading: false, isDeleted: true };
		case DELETE_USER_RESET:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const createFavoriteReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_FAVORITE_REQUEST:
			return { loading: true };
		case CREATE_FAVORITE_SUCCESS:
			return { loading: false, success: action.payload };
		case CREATE_FAVORITE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const deleteFavoriteReducer = (state = { isDelete: false }, action) => {
	switch (action.type) {
		case DELETE_FAVORITE_REQUEST:
			return { loading: true };
		case DELETE_FAVORITE_SUCCESS:
			return { loading: false, isDelete: true };
		case DELETE_FAVORITE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const createLikeReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_LIKE_REQUEST:
			return { loading: true };
		case CREATE_LIKE_SUCCESS:
			return { loading: false, success: action.payload };
		case CREATE_LIKE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const deleteLikeReducer = (state = { isDelete: false }, action) => {
	switch (action.type) {
		case DELETE_LIKE_REQUEST:
			return { loading: true };
		case DELETE_LIKE_SUCCESS:
			return { loading: false, isDelete: true };
		case DELETE_LIKE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
		case NEW_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};

		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.payload,
			};

		case NEW_PASSWORD_SUCCESS:
			return {
				...state,
				success: true,
			};

		case FORGOT_PASSWORD_FAIL:
		case NEW_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
