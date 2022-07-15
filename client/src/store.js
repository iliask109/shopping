import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  allOrdersReducer,
  deleteOrderReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  updateOrderReducer,
} from "./reducers/orderReducers";
import {
  deleteReviewReducer,
  newProductReducer,
  newReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewsReducer,
  productSellerListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  allUsersReducer,
  createFavoriteReducer,
  deleteFavoriteReducer,
  userDeleteAdminReducer,
  userDetailsAdminReducer,
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateAdminReducer,
  userUpdatePasswordReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  orderCreate: orderCreateReducer,
  userDetails: userDetailsReducer,
  orderMineList: orderMineListReducer,
  orderDetails: orderDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  allUsers: allUsersReducer,
  allOrders: allOrdersReducer,
  userDetailsAdmin: userDetailsAdminReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  userDeleteAdmin: userDeleteAdminReducer,
  productUpdateAdmin: productUpdateReducer,
  productDeleteAdmin: productDeleteReducer,
  newProduct: newProductReducer,
  updateOrder: updateOrderReducer,
  deleteOrder: deleteOrderReducer,
  newReview: newReviewReducer,
  deleteReview: deleteReviewReducer,
  createFavorite: createFavoriteReducer,
  deleteFavorite: deleteFavoriteReducer,
  productReviews: productReviewsReducer,
  productSellerList: productSellerListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
