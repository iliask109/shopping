import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETALIS_FAIL,
  ORDER_DETALIS_REQUEST,
  ORDER_DETALIS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETALIS_REQUEST:
      return { loading: true };
    case ORDER_DETALIS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETALIS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const allOrdersReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return { loading: true };
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ALL_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateOrderReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};
export const deleteOrderReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};
