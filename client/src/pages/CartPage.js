import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSquareMinus, TbSquarePlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, removeFromCart } from "../actions/cartActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "../components/Title";

export default function CartPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
	const shippingPrice = itemsPrice > 250 ? 0 : itemsPrice / 10;
	const totalPrice = itemsPrice + shippingPrice;

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const handleCart = (id, qty) => {
		if (qty < 1) {
			if (window.confirm("You sure want to remove the product from the list")) {
				removeFromCartHandler(id);
			}
		} else {
			dispatch(AddToCart(id, qty));
		}
	};

	const checkoutHandle = () => {
		if (userInfo) {
			navigate("/shipping");
		} else {
			alert("you need login if you want continue ");
		}
	};

	return (
		<div className="cart_page p-3">
			<Title title={"Cart"} />
			<button className="goBack" onClick={() => navigate(-1)}>
				<ArrowBackIcon className="icon" />
			</button>
			{cartItems.length > 0 ? (
				<section className="shopping-cart ">
					<div className="container">
						<div className="content">
							<div className="row">
								<div className="col-md-12 col-lg-8">
									<div className="items">
										{cartItems.map((item) => (
											<div className="product" key={item.name}>
												<div className="row">
													<div className="col-md-3">
														<img
															className="img-fluid mx-auto d-block image"
															src={item.image}
															alt="image_product"
														/>
													</div>
													<div className="col-md-8">
														<div className="info">
															<div className="row">
																<div className="col-md-5 product-name">
																	<div className="product-name">
																		<Link to={`/products/${item.product}`}>
																			{item.name}
																		</Link>
																		<div className="product-info">
																			<div>
																				Seller:{" "}
																				<span className="value">
																					{item.seller}
																				</span>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-md-4 card_input">
																	<TbSquarePlus
																		className="card_icon plus"
																		onClick={() =>
																			handleCart(item.product, item.qty + 1)
																		}
																	/>
																	<input
																		type="number"
																		value={item.qty}
																		max={item.stock}
																		onChange={() => {}}
																	/>
																	<TbSquareMinus
																		className="card_icon minus"
																		onClick={() =>
																			handleCart(item.product, item.qty - 1)
																		}
																	/>
																</div>
																<div className="col-md-3 price">
																	 <span>${item.price}</span>
																</div>
															</div>
														</div>
													</div>
													<button
														type="button"
														className="btn btn-danger removeCart"
														onClick={() => removeFromCartHandler(item.product)}>
														<span className="glyphicon glyphicon-remove">
															{" "}
															x
														</span>
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="col-md-12 col-lg-4">
									<div className="summary">
										<h3>Summary</h3>
										<div className="summary-item">
											<span className="text">Subtotal</span>
											<span className="price">${itemsPrice.toFixed(2)}</span>
										</div>

										<div className="summary-item">
											<span className="text">Shipping</span>
											<span className="price">${shippingPrice.toFixed(2)}</span>
										</div>
										<div className="summary-item">
											<span className="text">Total</span>
											<span className="price">${totalPrice.toFixed(2)}</span>
										</div>
										<button
											onClick={() => checkoutHandle()}
											type="button"
											className="btn btn-primary btn-lg btn-block">
											Checkout
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<h2 className="mt-5">Your Cart is Empty</h2>
			)}
		</div>
	);
}
