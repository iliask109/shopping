import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listOrderMine } from "../actions/orderActions";
import { deleteFavoriteUser, detailsUser } from "../actions/userActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
	USER_UPDATE_PASSWORD_RESET,
	USER_UPDATE_PROFILE_RESET,
} from "../constants/userConstants";
import Title from "../components/Title";

export default function ProfilePage() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	const orderMineList = useSelector((state) => state.orderMineList);
	const { orders } = orderMineList;
	const deleteFavorite = useSelector((state) => state.deleteFavorite);
	const { isDelete } = deleteFavorite;
	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsUser(userInfo._id));
		dispatch(listOrderMine());
		dispatch({ type: USER_UPDATE_PASSWORD_RESET });
		dispatch({ type: USER_UPDATE_PROFILE_RESET });
	}, [dispatch, userInfo._id]);

	const deleteFavoriteId = (productId) => {
		dispatch(deleteFavoriteUser(productId));
	};
	
	if (isDelete) window.location.reload();

	return (
		<div>
			<Title title={"Profile"} />

			<div className="container profile_page">
				<button className="goBack" onClick={() => navigate(-1)}>
					<ArrowBackIcon className="icon" />
				</button>
				{loading ? (
					<Loading />
				) : (
					<div className="main-body">
						{error && <MessageBox variant="danger">{error}</MessageBox>}

						<div className="row gutters-sm">
							<div className="col-md-4 mb-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex flex-column align-items-center text-center">
											<img
												src={user.user.avatar}
												alt="Admin"
												className="rounded-circle"
												width="150"
											/>
											<div className="mt-3">
												<h4>{user.user.name}</h4>
												<p className="text-secondary mb-1">{user.user.role}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-8">
								<div className="card mb-3">
									<div className="card-body">
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Full Name</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{shippingAddress.fullName || user.user.name}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Email</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{user.user.email}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Phone</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{shippingAddress.phone || ""}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Address</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{(shippingAddress.address,
												shippingAddress.city,
												shippingAddress.country) || ""}
											</div>
										</div>
										<hr />
										<div className="row ">
											<div className="col-6">
												<Link className="btn btn-info " to="/me/updatePassowrd">
													Edit Password
												</Link>
											</div>
											<div className="col-6">
												<Link className="btn btn-success " to="/me/updateUser">
													Edit User
												</Link>
											</div>
										</div>
									</div>
								</div>

								<div className="row gutters-sm">
									<div className="col-sm-6 mb-3">
										<div className="card h-100">
											<div className="card-body">
												<h6 className="d-flex align-items-center mb-3">
													<i className="material-icons text-info ">
														Last 5 Orders
													</i>
												</h6>
												<TableContainer component={Paper} className="table">
													<Table
														sx={{ minWidth: 250 }}
														aria-label="simple table">
														<TableHead>
															<TableRow>
																<TableCell className="tableCell">
																	Index
																</TableCell>
																<TableCell className="tableCell">
																	totalPrice
																</TableCell>
																<TableCell className="tableCell">
																	Date
																</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{orders?.slice(-5).map((row, index) => (
																<TableRow key={index}>
																	<TableCell className="tableCell">
																		{index + 1}
																	</TableCell>
																	<TableCell className="tableCell">
																		<Link to={`/me/order/${row._id}`}>
																			{row.totalPrice}
																		</Link>
																	</TableCell>
																	<TableCell className="tableCell">
																		{row.createdAt.slice(0, 10)}
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>
												</TableContainer>
											</div>
										</div>
									</div>
									<div className="col-sm-6 mb-3">
										<div className="card h-100">
											<div className="card-body">
												<h6 className="d-flex align-items-center mb-3">
													<i className="material-icons text-info mr-2">
														My Favorites Products
													</i>
												</h6>
												<TableContainer component={Paper} className="table">
													<Table
														sx={{ minWidth: 150 }}
														aria-label="simple table">
														<TableHead>
															<TableRow>
																<TableCell className="tableCell">
																	Index
																</TableCell>
																<TableCell className="tableCell">
																	name
																</TableCell>
																<TableCell className="tableCell">
																	delete
																</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{user?.user.favorites
																.slice(0, 5)
																.map((row, index) => (
																	<TableRow key={index}>
																		<TableCell className="tableCell">
																			{index + 1}
																		</TableCell>
																		<TableCell className="tableCell">
																			<Link to={`/products/${row.product}`}>
																				{row.name}
																			</Link>
																		</TableCell>
																		<TableCell
																			onClick={() =>
																				deleteFavoriteId(row.product)
																			}
																			className="tableCell"
																			style={{
																				cursor: "pointer",
																				color: "red",
																				fontWeight: "bold",
																			}}>
																			x
																		</TableCell>
																	</TableRow>
																))}
														</TableBody>
													</Table>
												</TableContainer>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
