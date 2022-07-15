import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

export default function Placeorder() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const {  success, order } = orderCreate;



  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = toPrice(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);

  return (
    <div>
        
    <div className="h-100 gradient-custom">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ "borderRadius": "10px" }}>
              <div className="card-header px-4 py-5">
                <h5 className="text-muted mb-0">
                  Thanks for your Order,
                  <span style={{ color: "#a8729a" }}>Ilia</span>!
                </h5>
              </div>
              <div className="card-body p-4">
                {cart.cartItems.map((item) => (
                  <div className="card shadow-0 border mb-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2">
                          <img src={item.image} className="img-fluid" alt="Phone" />
                        </div>
                        <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0">{item.name}</p>
                        </div>

                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">Qty: {item.qty}</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">${item.price}</p>
                        </div>
                      </div>
                      <hr
                        className="mb-4"
                        style={{ "backgroundColor": "#e0e0e0", opacity: 1 }}
                      />
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Order Details</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Total</span> ${cart.itemsPrice}
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">GST 18%</span> {cart.taxPrice}
                  </p>
                </div>

                <div className="d-flex justify-content-between mb-5">
                  <p className="text-muted mb-0">
                    Total qty : {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
                  </p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Delivery Charges</span>{" "}
                    {cart.shippingPrice > 250 || cart.shippingPrice === 0
                      ? "Free"
                      : cart.shippingPrice}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">
                    Pay By : <b>{cart.paymentMethod}</b>
                  </p>
                </div>
              </div>
              <div
                className="card-footer border-0 px-4 py-5 "
                onClick={() => placeOrderHandler()}
                style={{
                  "backgroundColor": " #a8729a",
                  "borderBottomLeftRadius": "10px",
                  "borderBottomRightRadius": "10px",
                  cursor: "pointer",
                }}
              >
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0 ">
                  Total paid:{" "}
                  <span
                    className="h2 mb-0
                   ms-2"
                  >
                    ${cart.totalPrice}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
