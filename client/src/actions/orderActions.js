import Axios from "axios";

import { CART_EMPTY } from "../constants/cartConstants";
import {
	ALL_ORDERS_FAIL,
	ALL_ORDERS_REQUEST,
	ALL_ORDERS_SUCCESS,
	DELETE_ORDER_FAIL,
	DELETE_ORDER_REQUEST,
	DELETE_ORDER_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETALIS_FAIL,
	ORDER_DETALIS_REQUEST,
	ORDER_DETALIS_SUCCESS,
	ORDER_MINE_LIST_FAIL,
	ORDER_MINE_LIST_REQUEST,
	ORDER_MINE_LIST_SUCCESS,
	UPDATE_ORDER_FAIL,
	UPDATE_ORDER_REQUEST,
	UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
	dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
	try {
		const {
			userSignin: { userInfo },
		} = getState();
		const { data } = await Axios.post("/api/orders", order, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		});
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
		dispatch({ type: CART_EMPTY });
		localStorage.removeItem("cartItems");
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listOrderMine = () => async (dispatch) => {
	dispatch({ type: ORDER_MINE_LIST_REQUEST });
	try {
		const { data } = await Axios.get("/api/orders/mine");

		dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
	}
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
	dispatch({ type: ORDER_DETALIS_REQUEST, payload: orderId });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await Axios.get(`/api/orders/${orderId}`, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: ORDER_DETALIS_SUCCESS, payload: data });
	} catch (error) {
		const message = error.response.data.message;
		dispatch({ type: ORDER_DETALIS_FAIL, payload: message });
	}
};

//text

export const allOrdersAdmin = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_ORDERS_REQUEST });

		const { data } = await Axios.get(`/api/admin/orders`);

		dispatch({
			type: ALL_ORDERS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_ORDERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateOrderAdmin = (id, orderData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_ORDER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await Axios.put(
			`/api/admin/order/${id}`,
			orderData,
			config
		);

		dispatch({
			type: UPDATE_ORDER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteOrderAdmin = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_ORDER_REQUEST });

		const { data } = await Axios.delete(`/api/admin/order/${id}`);

		dispatch({
			type: DELETE_ORDER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};
