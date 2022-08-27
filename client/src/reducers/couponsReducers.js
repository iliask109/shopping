import {
	DELETE_COUPON_FAIL,
	DELETE_COUPON_REQUEST,
	DELETE_COUPON_SUCCESS,
	GET_ALL_COUPONS_FAIL,
	GET_ALL_COUPONS_REQUEST,
	GET_ALL_COUPONS_SUCCESS,
	NEW_COUPON_FAIL,
	NEW_COUPON_REQUEST,
	NEW_COUPON_RESET,
	NEW_COUPON_SUCCESS,
} from "../constants/couponConstants";

export const getCouponsReducer = (state = { coupons: [] }, action) => {
	switch (action.type) {
		case GET_ALL_COUPONS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case GET_ALL_COUPONS_SUCCESS:
			return {
				loading: false,
				coupons: action.payload,
			};

		case GET_ALL_COUPONS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const createCouponReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_COUPON_REQUEST:
			return { loading: true };
		case NEW_COUPON_SUCCESS:
			return { loading: false, success: true, coupon: action.payload };
		case NEW_COUPON_FAIL:
			return { loading: false, error: action.payload };
		case NEW_COUPON_RESET:
			return { };

		default:
			return state;
	}
};

export const deleteCouponReducer = (state = { isDeleted: false }, action) => {
	switch (action.type) {
		case DELETE_COUPON_REQUEST:
			return { loading: true };
		case DELETE_COUPON_SUCCESS:
			return { loading: false, isDeleted: action.payload.success };
		case DELETE_COUPON_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
