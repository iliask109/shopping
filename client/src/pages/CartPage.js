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
		<div>
			<div className="cart_page row">
				<div className="">
					{cartItems.length > 0 ? (
						<div className=" ">
							<table className="table table-hover col-12">
								<thead>
									<tr>
										<th scope="col">Product</th>
										<th scope="col">Quantity</th>
										<th scope="col" className="text-center">
											Price
										</th>
										<th scope="col" className="text-center">
											Total
										</th>
										<th> </th>
									</tr>
								</thead>
								<tbody>
									{cartItems.map((item) => (
										<tr key={item.product}>
											<td className="col-md-6 ">
												<div className="media">
													<Link
														to={`/products/${item.product}`}
														className="thumbnail pull-left">
														<img
															className="media-object"
															alt="img"
															src={item.image}
														/>
													</Link>
													<div className="media-body">
														<h4 className="media-heading">
															<Link to={`/products/${item.product}`}>
																{item.name}
															</Link>
														</h4>
														<h5 className="media-heading">
															by <Link to="#">{item.seller}</Link>
														</h5>
													</div>
												</div>
											</td>
											<td className=" card_input ">
												<TbSquarePlus
													className="card_icon plus"
													onClick={() => handleCart(item.product, item.qty + 1)}
												/>
												<input
													type="number"
													value={item.qty}
													max={item.stock}
													onChange={() => {}}
												/>
												<TbSquareMinus
													className="card_icon minus"
													onClick={() => handleCart(item.product, item.qty - 1)}
												/>
											</td>
											<td className="col-md-1 text-center">
												<strong>${item.price}</strong>
											</td>
											<td className="col-md-1 text-center">
												<strong>${(item.qty * item.price).toFixed(2)}</strong>
											</td>
											<td className="col-md-1">
												<button
													type="button"
													className="btn btn-danger"
													onClick={() => removeFromCartHandler(item.product)}>
													<span className="glyphicon glyphicon-remove"></span>
													Remove
												</button>
											</td>
										</tr>
									))}
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<h5>Subtotal</h5>
										</td>
										<td className="text-right " colspan="2">
											<h5>
												<strong>${itemsPrice.toFixed(2)}</strong>
											</h5>
										</td>
									</tr>
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<h5>Estimated shipping</h5>
										</td>
										<td className="text-right">
											<h5>
												<strong>${shippingPrice.toFixed(2)}</strong>
											</h5>
										</td>
									</tr>
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<h5>Total</h5>
										</td>
										<td className="text-right">
											<h3>
												<strong>${totalPrice.toFixed(2)}</strong>
											</h3>
										</td>
									</tr>
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td></td>
										<td>
											<button
												type="button"
												className="btn btn-success"
												onClick={() => navigate("/shipping")}>
												Checkout
												<span className="glyphicon glyphicon-play"></span>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					) : (
						<h2 className="mt-5">Your Cart is Empty</h2>
					)}
				</div>
			</div>
		</div>
	);
}
