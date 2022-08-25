import React, { useEffect, useState } from "react";
import Rating from "../../components/rating/Rating";
import { TbSquareMinus, TbSquarePlus } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteReviewAdmin,
	detailsProduct,
	listProducts,
	newReviewAdmin,
} from "../../actions/productActions";
import Loading from "../../components/loading/Loading";
import { AddToCart } from "../../actions/cartActions";
import MessageBox from "../../components/MessageBox";
import Title from "../../components/Title";
import "./product.scss";
import { Carousel } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

export default function ProductPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [openDescription, setOpenDescription] = useState(true);
	const [query, setQuery] = useState(1);
	const [couponConfirm, setCouponConfirm] = useState(false);
	const [couponBtn, setCouponBtn] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [addToCart, setAddToCart] = useState(false);

	const { id } = useParams();
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	const deleteReview = useSelector((state) => state.deleteReview);
	const { isDeleted } = deleteReview;
	const newReview = useSelector((state) => state.newReview);
	const { success, loading: loadingReview } = newReview;
	const productList = useSelector((state) => state.productList);
	const {
		loading: loadingProducts,
		error: errorProducts,
		products,
	} = productList;
	const getCoupons = useSelector((state) => state.getCoupons);
	const { coupons } = getCoupons;

	useEffect(() => {
		dispatch(detailsProduct(id));
		dispatch(listProducts({}));
	}, [dispatch, id]);
	// add to cart
	const addCart = (productId) => {
		dispatch(
			AddToCart(productId, query, couponConfirm && coupons[0]?.discount)
		);
		setAddToCart(true);
	};

	const handleCart = () => {
		setAddToCart(false);
		navigate("/cart");
	};

	const handleCartKeep = () => {
		setAddToCart(false);
		navigate("/");
	};

	// new review
	const reviewHandler = (productId) => {
		dispatch(newReviewAdmin({ rating, comment, productId }));
	};

	// delete review
	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteReviewAdmin(reviewId, id));
	};

	if (isDeleted) {
		if (window.confirm("Are you sure you want to delete this review"))
			window.location.reload();
	}
	if (success) {
		window.location.reload();
	}

	return (
		<div className="product_page">
			{loading ? (
				<Loading />
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					<Title title={"Product"} />
					{product && (
						<div className="go_back">
							* <Link to="/">Home</Link>/
							<Link to={`/search/category/${product?.category}`}>
								{product?.category}
							</Link>
							/<Link to={`/products/${product?._id}`}>{product?.name}</Link>
						</div>
					)}
					<div className=" col-xl-12  ">
						<div className="modal-content container ">
							<div className="modal-header">
								<h4 className="modal-title" id="myModalLabel">
									<i className="text-muted fa fa-shopping-cart"></i>
									<strong> {product?.name}</strong>
								</h4>
							</div>
							<div className="modal-body ">
								<div className="col-12 col-lg-5 img-fluid  " id="product_image">
									{product?.images && product?.images.length > 1 ? (
										<Carousel>
											{product.images &&
												product.images.map((image) => (
													<Carousel.Item key={image.public_id}>
														<img className="d-block w-100" src={image.url} />
													</Carousel.Item>
												))}
										</Carousel>
									) : (
										<img
											className="d-block w-100"
											src={product?.images && product?.images[0].url}
											alt={product?.title}
										/>
									)}
								</div>
								<table className="pull-left col-md-12 mb-3">
									<tbody>
										<tr>
											<td className="h6">
												<strong>Name : </strong>
											</td>
											<td> </td>
											<td className="h5">{product?.name}</td>
										</tr>

										<tr>
											<td className="h6">
												<strong>Category: </strong>
											</td>
											<td> </td>
											<td className="h5">{product?.category}</td>
										</tr>

										<tr>
											<td className="h6">
												<strong>Seller : </strong>
											</td>
											<td> </td>
											<td className="h5">
												<Link to={`/seller/${product?.user}`}>
													{product?.seller}
												</Link>
											</td>
										</tr>

										<tr>
											<td className="h6">
												<strong>Ratings : </strong>
											</td>
											<td> </td>
											<td className="h5 ratings_product">
												<Rating
													rating={product?.ratings}
													numReviews={product?.numOfReviews}
												/>
											</td>
										</tr>

										<tr>
											<td className="h6">
												<strong>Stock : </strong>
											</td>
											<td> </td>
											<td className="h5">
												{product?.stock > 0 ? (
													<span className="text-success">In Stock</span>
												) : (
													<span className="text-danger">Out of Stock</span>
												)}
											</td>
										</tr>

										<tr>
											<td className="h6">
												<strong>price : </strong>
											</td>
											<td> </td>
											<td className="h5">
												$
												{product?.discount > 1 && (
													<del className="mr-4">{product?.price}</del>
												)}
												{couponConfirm && product?.discount === 0
													? product?.price -
													  product?.price * (coupons[0]?.discount / 100)
													: couponConfirm && product?.discount > 0
													? product?.price -
													  product?.price *
															((coupons[0]?.discount + product?.discount) / 100)
													: product?.discount > 0
													? product?.price -
													  product?.price * (product?.discount / 100)
													: product?.price}
											</td>
										</tr>

										{product?.stock > 0 && (
											<tr className="amount">
												<td className="h6">
													<strong>Amount : </strong>
												</td>
												<td className="card_input">
													<TbSquarePlus
														className="card_icon plus"
														onClick={() => {
															if (query < product?.stock) setQuery(query + 1);
														}}
													/>
													<input
														value={query}
														onChange={() => {}}
														min="0"
														max={product.stock}
													/>
													<TbSquareMinus
														className="card_icon minus"
														onClick={() => {
															if (query > 1) setQuery(query - 1);
														}}
													/>
												</td>
											</tr>
										)}
										<tr className="couponText">
											<td className="h6 ">
												<strong>Coupon : </strong>
											</td>
											<td>
												<input
													onChange={(e) => {
														if (e.target.value === coupons[0]?.code) {
															setCouponConfirm(true);
															setCouponBtn(true);
														}
													}}
													disabled={couponBtn}
												/>
												{!couponConfirm && (
													<ClearIcon style={{ color: "red" }} />
												)}
												{couponConfirm && (
													<CheckIcon style={{ color: "green" }} />
												)}
											</td>
										</tr>
									</tbody>
								</table>
								<div className="modal-footer mt-3">
									{!addToCart && (
										<div className="text-right pull-right col-md-3">
											Total: <br />
											<span className="h3 text-muted">
												<strong>
													$
													{(
														query *
														(couponConfirm && product?.discount === 0
															? product?.price -
															  product?.price * (coupons[0]?.discount / 100)
															: couponConfirm && product?.discount > 0
															? product?.price -
															  product?.price *
																	((coupons[0]?.discount + product?.discount) /
																		100)
															: product?.discount > 0
															? product?.price -
															  product?.price * (product?.discount / 100)
															: product?.price)
													).toFixed(2)}
												</strong>
											</span>
										</div>
									)}
									<div className="text-right pull-right col-md-7">
										{query * product?.price > 0 &&
											!addToCart &&
											product?.stock > 0 && (
												<button
													className="add_to"
													onClick={() => addCart(product._id)}>
													Add to cart
												</button>
											)}
										{addToCart && (
											<>
												<button
													className=" add_to bg-primary  col-md-4"
													onClick={() => handleCartKeep()}>
													Keep buying
												</button>
												<button
													className="add_to bg-success  col-md-6"
													onClick={() => handleCart()}>
													Go To Cart
												</button>
											</>
										)}
									</div>
								</div>
								<div className="btn_action">
									<button
										type="button"
										className="btn btn-outline-success btn-sm"
										onClick={() => setOpenDescription(true)}>
										Description
									</button>

									<button
										type="button"
										className="btn btn-outline-primary btn-sm"
										onClick={() => setOpenDescription(false)}>
										Reviews ({product?.reviews.length})
									</button>
								</div>
								{openDescription && (
									<p className="open_info hide">{product?.description}</p>
								)}
								{!openDescription && (
									<div className="reviews row">
										<div className="col-md-12">
											<div className="offer-dedicated-body-left border mt-4">
												<div className="tab-content" id="pills-tabContent">
													<div
														className="tab-pane fade active show"
														id="pills-reviews"
														role="tabpanel"
														aria-labelledby="pills-reviews-tab">
														{product?.reviews.length > 0 && (
															<div className="bg-white rounded shadow-sm p-4 mb-4  restaurant-detailed-ratings-and-reviews">
																<h5 className="mb-1">All Reviews</h5>

																{product.reviews.map((item) => (
																	<div
																		className="reviews-members pt-4 pb-4 "
																		key={item._id}>
																		<div className="media">
																			{item.user === userInfo?._id && (
																				<span
																					className="delete_review btn btn-danger"
																					onClick={() =>
																						deleteReviewHandler(item._id)
																					}>
																					X
																				</span>
																			)}
																			<img
																				src={item.user_img}
																				alt="image_user"
																			/>
																			<div className="media-body">
																				<div className="reviews-members-header">
																					<h6 className="mb-1">{item.name}</h6>
																					<p className="text-gray">
																						{item.createdAt.slice(0, 10)}
																					</p>
																				</div>
																				<div className="reviews-members-body">
																					<p>{item.comment}</p>
																				</div>
																				<div className="reviews-members-footer">
																					<Rating
																						caption={item.rating}
																						rating={item.rating}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																))}
																<hr />
															</div>
														)}
														<div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
															{userInfo ? (
																<>
																	<h5 className="mb-4">Leave Comment</h5>
																	<p className="mb-2">Rate the Place</p>
																	<div className="mb-4">
																		<span className="star-rating">
																			<select
																				id="rating"
																				value={rating}
																				onChange={(e) =>
																					setRating(e.target.value)
																				}>
																				<option value="">Select...</option>
																				<option value="1">1- Poor</option>
																				<option value="2">2- Fair</option>
																				<option value="3">3- Good</option>
																				<option value="4">4- Very good</option>
																				<option value="5">5- Excelent</option>
																			</select>
																		</span>
																	</div>
																	<form>
																		<div className="form-group">
																			<label>Your Comment</label>
																			<textarea
																				className="form-control"
																				onChange={(e) =>
																					setComment(e.target.value)
																				}></textarea>
																		</div>
																		<div className="form-group">
																			<button
																				className="btn btn-primary btn-sm "
																				type="button"
																				onClick={() => reviewHandler(id)}
																				disabled={loadingReview}>
																				Submit Comment
																			</button>
																		</div>
																	</form>
																</>
															) : (
																<div>
																	You need to Login or Register. <br />
																	If you want to write a review
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="top_products mt-3">
						<h5>Recommended products</h5>
						<div className="m-3 d-flex flex-nowrap same_category_card">
							{products?.slice(0, 4).map((item, i) => (
								<div className="card " key={i}>
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
									<button
										className="btn btn-primary"
										onClick={() => {
											setCouponBtn(false);
											setCouponConfirm(false);
											navigate(`/products/${item._id}`);
										}}>
										Buy
									</button>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
