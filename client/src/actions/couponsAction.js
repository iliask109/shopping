import Axios from "axios";
import {
	DELETE_COUPON_FAIL,
	DELETE_COUPON_REQUEST,
	DELETE_COUPON_SUCCESS,
	GET_ALL_COUPONS_FAIL,
	GET_ALL_COUPONS_REQUEST,
	GET_ALL_COUPONS_SUCCESS,
	NEW_COUPON_FAIL,
	NEW_COUPON_REQUEST,
	NEW_COUPON_SUCCESS,
} from "../constants/couponConstants";

export const getAllCouponsAdmin = () => async (dispatch) => {
	try {
		dispatch({ type: GET_ALL_COUPONS_REQUEST });
		const { data } = await Axios.get("/api/coupon");
		dispatch({ type: GET_ALL_COUPONS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_ALL_COUPONS_FAIL });
	}
};

export const createCouponAdmin = (coupon) => async (dispatch) => {
	try {
		dispatch({ type: NEW_COUPON_REQUEST });
		const { data } = await Axios.post(`/api/coupon`, coupon);
		dispatch({ type: NEW_COUPON_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: NEW_COUPON_FAIL });
	}
};

export const deleteCouponAdmin = (couponId) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_COUPON_REQUEST });
		const { data } = await Axios.delete(`/api/coupon/${couponId}`);
		dispatch({ type: DELETE_COUPON_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: DELETE_COUPON_FAIL });
	}
};
