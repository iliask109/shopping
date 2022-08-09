import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsSellerProducts } from "../../actions/productActions";
import {
	createLike,
	deleteLikeUser,
	getUserDetailsAdmin,
} from "../../actions/userActions";
import Loading from "../../components/loading/Loading";
import MessageBox from "../../components/MessageBox";
import Rating from "../../components/rating/Rating";
import Title from "../../components/Title";
import "./profile.scss";

export default function SellerProfile() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetailsAdmin);
	const { loading, error, user } = userDetails;

	const productListSellerReducer = useSelector(
		(state) => state.productListSellerReducer
	);
	const { products, loading: loadingProducts } = productListSellerReducer;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	useEffect(() => {
		dispatch(getUserDetailsAdmin(id));
		dispatch(detailsSellerProducts(id));
	}, [dispatch, id]);

	// create like or remove like
	const likeHandler = () => {
		if (user?.likes?.find((i) => i.user === userInfo._id)) {
			dispatch(deleteLikeUser(id));
			window.location.reload();
		} else {
			dispatch(createLike(id));
			window.location.reload();
		}
	};

	return (
		<div className="seller_page">
			<Title title={"My Page"} />

			<div className="container ">
				{loading ? (
					<Loading />
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<div className="main-body">
						<div className="row gutters-sm m-3">
							<div className="col-12 mb-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex flex-column align-items-center text-center">
											{userInfo && userInfo?._id !== user?._id && (
												<button
													type="button"
													id="like-button"
													className={`${
														user?.likes?.find((i) => i.user === userInfo._id)
															? "like"
															: ""
													}`}
													onClick={() => likeHandler()}>
													<svg
														className="heart-icon"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 100 100">
														<path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z" />
													</svg>
													Like
												</button>
											)}
											<img
												src={user?.avatar?.url}
												alt="Admin"
												className="rounded-circle"
												width="150"
												height="150"
											/>
											<div className="mt-3">
												<h4>{user?.name}</h4>
												<div className=" mb-1">
													<b>{user?.role}</b>
												</div>
												<button type="button" id="like">
													<svg
														className="heart-icon"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 100 100">
														<path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z" />
													</svg>
													{user?.likes?.length}
												</button>
												<br />

												<p>{user?.aboutMe}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="container mt-4">
								<hr />

								{loadingProducts ? (
									<Loading />
								) : (
									<div className="row ">
										{products?.map((item) => (
											<Link
												to={`/products/${item._id}`}
												style={{ textDecoration: "none" }}
												key={item.name}>
												<div className="m-3 card_seller">
													<div className="card">
														<img
															src={item.images[0].url}
															className="card-img-top"
															alt="..."
														/>
														<div className="card-body ">
															<h5 className="card-title ">{item.name}</h5>

															<div className="card-text">
																<Rating
																	rating={item.ratings}
																	numReviews={item.numOfReviews}
																/>
															</div>
															<p className="card-text"> price: ${item.price}</p>
														</div>
													</div>
												</div>
											</Link>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
