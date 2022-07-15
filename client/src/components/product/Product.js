import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createFavorite } from "../../actions/userActions";
import Rating from "../rating/Rating";

import "./product.css";

export default function Product({ products }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleCart = (productId) => {
		navigate(`/products/${productId}`);
	};

	const favoriteHandler = (productId) => {
		dispatch(createFavorite(productId));
	};

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	return (
		<div className="poduct ">
			<div style={{ marginTop: "50px" }}>
				<div className="row">
					{products.map((product) => (
						<div className="col-md-4  col-12" key={product.name}>
							<div className="card-sl">
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
										onClick={() => favoriteHandler(product._id)}>
										<i className="fa fa-heart "></i>
									</Link>
								)}
								<div className="card-heading">{product.name.slice(0, 32)}</div>
								<div className="card-text">{product.category}</div>
								<Rating
									rating={product.ratings}
									numReviews={product.numOfReviews}
								/>

								<div className="card-text">${product.price}</div>

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
