import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createFavorite, deleteFavoriteUser } from "../actions/userActions";
import Rating from "./rating/Rating";
import { listProducts } from "../actions/productActions";

export default function SalesProducts() {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const {  products } = productList;

	const navigate = useNavigate();

	const handleCart = (productId) => {
		navigate(`/products/${productId}`);
	};

	const favoriteHandler = (productId) => {
		dispatch(createFavorite(productId));
	};

	const deleteFavoriteId = (productId) => {
		dispatch(deleteFavoriteUser(productId));
	};

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	useEffect(() => {
		dispatch(
			listProducts({
				discount: 1,
			})
		);
	}, [dispatch]);

	return (
		<div className="product">
			<div style={{ marginTop: "20px" }}>
				<div className="row">
					{products?.slice(0, 4).map((product) => (
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
									<img src={product.image} alt="img" />
								</div>

								{userInfo && (
									<Link
										className={`card-action ${
											userInfo.favorites?.find((i) => i.product === product._id)
												? "love"
												: ""
										}`}
										to="/"
										onClick={() =>
											userInfo.favorites?.find((i) => i.product === product._id)
												? deleteFavoriteId(product._id)
												: favoriteHandler(product._id)
										}>
										<i className="fa fa-heart "></i>
									</Link>
								)}
								<div className="card-heading">{product.name.slice(0, 32)}</div>
								<div className="card-text">{product.category}</div>
								<Rating
									rating={product.ratings}
									numReviews={product.numOfReviews}
								/>
								<div className="price">
									<div className="card-text">
										${" "}
										{product.discount === 0 ? (
											product.price
										) : (
											<del>{product.price}</del>
										)}
									</div>
									{product.discount > 0 && (
										<div className="card-text">
											${" "}
											<b>
												{(
													product.price -
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