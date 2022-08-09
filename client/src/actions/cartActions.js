import Axios from "axios";
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const AddToCart = (productId, qty) => async (dispatch, getState) => {
	const { data } = await Axios.get(`/api/products/${productId}`);
	const {
		cart: { cartItems },
	} = getState();

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			name: data.name,
			images: data.images[0].url,
			price:
				data.discount > 0
					? (data.price - data.price * (data.discount / 100)).toFixed(2)
					: data.price,
			stock: data.stock,
			product: data._id,
			seller: data.seller,
			qty,
		},
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: productId });
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
	localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
	localStorage.setItem("paymentMethod", JSON.stringify(data));
};
