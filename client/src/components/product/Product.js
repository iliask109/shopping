import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createFavorite, deleteFavoriteUser } from "../../actions/userActions";
import Rating from "../rating/Rating";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import "./product.scss";
import { useMediaQuery } from "react-responsive";

export default function Product({ products, home }) {
	const view1 = useMediaQuery({ query: "(max-width: 1150px)" });
	const view2 = useMediaQuery({ query: "(max-width: 750px)" });
	const view3 = useMediaQuery({ query: "(max-width: 500px)" });

	const max = view3 ? 1 : view2 ? 2 : view1 ? 3 : 4;
	const [carousel, setCarousel] = useState([0, max]);

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		setCarousel([0, max]);
	}, [max]);

	// navigate to the product
	const handleCart = (productId) => {
		navigate(`/products/${productId}`);
	};

	// add product to the favorite user
	const favoriteHandler = (productId) => {
		dispatch(createFavorite(productId));
	};

	// delete favorite
	const deleteFavoriteId = (productId) => {
		dispatch(deleteFavoriteUser(productId));
	};

	return (
		<div className="product">
			<div style={{ marginTop: "20px" }}>
				{home && (
					<div className="btn-product">
						{carousel[0] > 0 && (
							<ArrowCircleLeftIcon
								className="icon_left"
								type="button"
								onClick={() => {
									setCarousel([carousel[0] - max, carousel[1] - max]);
								}}
							/>
						)}
						{carousel[1] < products?.length && (
							<ArrowCircleRightIcon
								className="icon_right"
								type="button"
								onClick={() => {
									setCarousel([carousel[0] + max, carousel[1] + max]);
								}}
							/>
						)}
					</div>
				)}
				<div className={`${home ? "d-flex" : "row"}`}>
					{products
						?.slice(carousel[0], home ? carousel[1] : products.length)
						.map((product) => (
							<div
								className="col-md-4 col-sm-6 col-xl-3 product_card "
								key={product.name}>
								<div className="card-sl ">
									{product.discount > 0 && (
										<div className="discount discount-top-right">
											<span>{product.discount}%</span>
										</div>
									)}

									<div className="card-image">
										<img src={product?.images[0]?.url} alt="img" />
									</div>

									{userInfo && (
										<Link
											className={`card-action ${
												userInfo.favorites?.find(
													(i) => i.product === product._id
												)
													? "love"
													: ""
											}`}
											to="/"
											onClick={() =>
												userInfo.favorites?.find(
													(i) => i.product === product._id
												)
													? deleteFavoriteId(product._id)
													: favoriteHandler(product._id)
											}>
											<i className="fa fa-heart "></i>
										</Link>
									)}
									<div className="card-heading">
										{product?.name.slice(0, 32)}
									</div>
									<div className="card-text">{product?.category}</div>
									<Rating
										rating={product?.ratings}
										numReviews={product?.numOfReviews}
									/>
									<div className="price">
										<div className="card-text">
											${" "}
											{product?.discount === 0 ? (
												product?.price
											) : (
												<del>{product?.price}</del>
											)}
										</div>
										{product?.discount > 0 && (
											<div className="card-text">
												${" "}
												<b>
													{(
														product?.price -
														product.price * (product.discount / 100)
													).toFixed(2)}
												</b>
											</div>
										)}
									</div>
									<button
										className="card-button"
										onClick={() => handleCart(product._id)}>
										Buy
									</button>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
