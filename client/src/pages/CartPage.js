import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSquareMinus, TbSquarePlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, removeFromCart } from "../actions/cartActions";

export default function CartPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

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

	return (
		<div className="cart_page">
			<section class="shopping-cart ">
				<div class="container">
					<div class="content">
						<div class="row">
							<div class="col-md-12 col-lg-8">
								<div class="items">
									{cartItems.map((item) => (
										<div class="product">
											<div class="row">
												<div class="col-md-3">
													<img
														class="img-fluid mx-auto d-block image"
														src={item.image}
													/>
												</div>
												<div class="col-md-8">
													<div class="info">
														<div class="row">
															<div class="col-md-5 product-name">
																<div class="product-name">
																	<Link to={`/products/${item.product}`}>
																		{item.name}
																	</Link>
																	<div class="product-info">
																		<div>
																			Seller:{" "}
																			<span class="value">{item.seller}</span>
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-md-4  card_input">
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
															<div class="col-md-3 price">
																<span>${item.price}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div class="col-md-12 col-lg-4">
								<div class="summary">
									<h3>Summary</h3>
									<div class="summary-item">
										<span class="text">Subtotal</span>
										<span class="price">${itemsPrice.toFixed(2)}</span>
									</div>

									<div class="summary-item">
										<span class="text">Shipping</span>
										<span class="price">${shippingPrice.toFixed(2)}</span>
									</div>
									<div class="summary-item">
										<span class="text">Total</span>
										<span class="price">${totalPrice.toFixed(2)}</span>
									</div>
									<button
										type="button"
										class="btn btn-primary btn-lg btn-block">
										Checkout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
