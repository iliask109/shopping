import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import MessageBox from "../../components/MessageBox";
import { Form } from "react-bootstrap";
import { detailsOrder, updateOrderAdmin } from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SingleOrderAdmin() {
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order = {}, loading, error } = orderDetails;
	const updateOrder = useSelector((state) => state.updateOrder);
	const { isUpdate } = updateOrder;

	const {
		shippingAddress,
		orderItems,
		itemsPrice,
		texPrice,
		shippingPrice,
		totalPrice,
	} = order;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const [status, setStatus] = useState("");

	useEffect(() => {
		if (order._id !== id) {
			dispatch(detailsOrder(id));
		}
	}, [dispatch, id, order]);

	const submitHandler = () => {
		dispatch(
			updateOrderAdmin(id, {
				shippingAddress,
				orderItems,
				itemsPrice,
				texPrice,
				shippingPrice,
				totalPrice,
				status,
			})
		);
	};

	return (
		<div>
		<button className="goBack" onClick={() => navigate(-1)}>
				<ArrowBackIcon className="icon" />
			</button>
			<div className="container rounded bg-white mt-5 mb-5">
				{loading ? (
					<Loading></Loading>
				) : (
					<div className="row">
						{error && <MessageBox variant="danger">{error}</MessageBox>}
						<div className="col-md-3 border-right"></div>
						<div className="col-md-5 border-right">
							{isUpdate && (
								<MessageBox variant="success">
									The update was successful
								</MessageBox>
							)}
							<div className="p-3 py-5">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4 className="text-right">Order Settings</h4>
								</div>

								<div className="row mt-3">
									<div className="col-md-12">
										<label className="labels">id</label>
										<input
											type="text"
											className="form-control"
											value={order._id}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">user</label>
										<input
											type="text"
											className="form-control"
											value={order.user.name}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">paid At</label>
										<input
											type="text"
											className="form-control"
											value={order.paidAt.slice(0, 10)}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">itemsPrice</label>
										<input
											type="text"
											className="form-control"
											value={order.itemsPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">taxPrice</label>
										<input
											type="text"
											className="form-control"
											value={order.taxPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">shippingPrice</label>
										<input
											type="text"
											className="form-control"
											value={order.shippingPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">totalPrice</label>
										<input
											type="text"
											className="form-control"
											value={order.totalPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Category</label>

										<Form.Select
											value={status}
											className="form-control"
											onChange={(e) => setStatus(e.target.value)}
											disabled={order.orderStatus === "Delivered"}>
											<option value="Processing">Processing</option>
											<option value="Shipped">Shipped</option>
											<option value="Delivered">Delivered</option>
										</Form.Select>
									</div>
								</div>

								<div className="mt-5 text-center">
									<button
										className="btn btn-primary profile-button"
										type="button"
										disabled={order.orderStatus === "Delivered"}
										onClick={() => submitHandler()}>
										Update
									</button>
								</div>
							</div>
						</div>
						<div className="col-md-4"></div>
					</div>
				)}
			</div>
		</div>
	);
}
