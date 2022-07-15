import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";

export default function PaymentPage() {
  const cart = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sumbitHandler = (e) => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const { cartItems } = cart;

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
		<div>
			<div>
				<CheckoutSteps step1 step2 step3></CheckoutSteps>

				<div className="card">
					<div className="card-body p-5">
						<ul
							className="nav bg-light nav-pills rounded nav-fill mb-3"
							role="tablist">
							<li className="nav-item">
								<a
									className="nav-link active"
									data-toggle="pill"
									href="#nav-tab-card"
									onClick={() => setPaymentMethod("Credit")}>
									<i className="fa fa-credit-card"></i> Credit Card
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									data-toggle="pill"
									href="#nav-tab-paypal"
									onClick={() => setPaymentMethod("PayPal")}>
									<i className="fa-brands fa-paypal"></i> Paypal
								</a>
							</li>
						</ul>

						<div className="tab-content">
							<div className="tab-pane fade show active" id="nav-tab-card">
								<p className="alert alert-success">
									Amount to pay ${itemsPrice}
								</p>
								<form>
									<div className="form-group">
										<label htmlFor="username">Full name (on the card)</label>
										<input
											type="text"
											className="form-control"
											name="username"
											placeholder=""
											required=""
										/>
									</div>

									<div className="form-group">
										<label htmlFor="cardNumber">Card number</label>
										<div className="input-group">
											<input
												type="text"
												className="form-control"
												name="cardNumber"
												placeholder=""
											/>
											<div className="input-group-append">
												<span className="input-group-text text-muted">
													<i className="fab fa-cc-visa"></i>  {" "}
													<i className="fab fa-cc-amex"></i>  
													<i className="fab fa-cc-mastercard"></i>
												</span>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-8">
											<div className="form-group">
												<label>
													<span className="hidden-xs">Expiration</span>{" "}
												</label>
												<div className="input-group">
													<input
														type="number"
														className="form-control"
														placeholder="MM"
														name=""
													/>
													<input
														type="number"
														className="form-control"
														placeholder="YY"
														name=""
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label
													data-toggle="tooltip"
													title=""
													data-original-title="3 digits code on back side of the card">
													CVV <i className="fa fa-question-circle"></i>
												</label>
												<input
													type="number"
													className="form-control"
													required=""
												/>
											</div>
										</div>
									</div>
									<button
										className="subscribe btn btn-primary btn-block"
										type="button"
										onClick={() => sumbitHandler()}>
										Confirm
									</button>
								</form>
							</div>
							<div className="tab-pane fade" id="nav-tab-paypal">
								<p>Paypal is easiest way to pay online</p>
								<p>
									<button type="button" className="btn btn-primary">
										<i className="fa-brands fa-paypal"></i> Log in my Paypal
									</button>
								</p>
								<p>
									<strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur
									adipisicing elit, sed do eiusmod tempor incididunt ut labore
									et dolore magna aliqua.{" "}
								</p>
								<button
									className="subscribe btn btn-primary btn-block"
									type="button"
									onClick={() => sumbitHandler()}>
									Confirm
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
