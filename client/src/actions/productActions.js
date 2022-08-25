import Axios from "axios";
import {
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_REVIEW_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	GET_REVIEWS_FAIL,
	GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	NEW_PRODUCT_FAIL,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SELLER_FAIL,
	PRODUCT_DETAILS_SELLER_REQUEST,
	PRODUCT_DETAILS_SELLER_SUCCESS,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_SELLER_LIST_FAIL,
	PRODUCT_SELLER_LIST_REQUEST,
	PRODUCT_SELLER_LIST_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";

export const listProducts =
	({
		pageSize = "",
		pageNumber = "",
		seller = "",
		name = "",
		discount = 0,
		category = "",
		order = "",
		min = 0,
		max = 0,
		rating = 0,
	}) =>
	async (dispatch) => {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		});
		try {
			const { data } = await Axios.get(
				`/api/products?pageSize=${pageSize}&pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}&discount=${discount}`
			);

			dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
		}
	};

export const detailsProduct = (productId) => async (dispatch) => {
	dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
	try {
		const { data } = await Axios.get(`/api/products/${productId}`);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const detailsSellerProducts = (productId) => async (dispatch) => {
	dispatch({ type: PRODUCT_DETAILS_SELLER_REQUEST, payload: productId });
	try {
		const { data } = await Axios.get(`/api/products/seller/${productId}`);
		dispatch({ type: PRODUCT_DETAILS_SELLER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_SELLER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProduct = (id, productData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await Axios.put(
			`/api/admin/product/${id}`,
			productData,
			config
		);
		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST });

		const { data } = await Axios.delete(`/api/admin/product/${id}`);

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const newProductAdmin = (productData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PRODUCT_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await Axios.post(
			`/api/admin/product/new`,
			productData,
			config
		);

		dispatch({
			type: NEW_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const newReviewAdmin = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_REVIEW_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await Axios.put(`/api/review`, reviewData, config);

		dispatch({
			type: NEW_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteReviewAdmin = (id, productId) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_REVIEW_REQUEST });

		const { data } = await Axios.delete(
			`/api/reviews?id=${id}&productId=${productId}`
		);

		dispatch({
			type: DELETE_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getProductReviewsAdmin = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_REVIEWS_REQUEST });

		const { data } = await Axios.get(`/api/reviews?id=${id}`);

		dispatch({
			type: GET_REVIEWS_SUCCESS,
			payload: data.reviews,
		});
	} catch (error) {
		dispatch({
			type: GET_REVIEWS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getProductsSeller = () => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_SELLER_LIST_REQUEST });
		const {
			userSignin: { userInfo },
		} = getState();

		const { data } = await Axios.get(`api/products/seller`, {
			headers: { Authorization: `Bearer ${userInfo?.token}` },
		});

		dispatch({
			type: PRODUCT_SELLER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_SELLER_LIST_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
