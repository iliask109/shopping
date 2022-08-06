import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import MessageBox from "../../../components/MessageBox";
import { Form } from "react-bootstrap";
import { detailsOrder, updateOrderAdmin } from "../../../actions/orderActions";
import Title from "../../../components/Title";

export default function SingleOrderAdmin() {
	const dispatch = useDispatch();

	const { id } = useParams();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order = {}, loading, error } = orderDetails;
	const updateOrder = useSelector((state) => state.updateOrder);
	const { isUpdate } = updateOrder;
	const [status, setStatus] = useState("");

	const {
		shippingAddress,
		orderItems,
		itemsPrice,
		texPrice,
		shippingPrice,
		totalPrice,
	} = order;

	useEffect(() => {
		dispatch(detailsOrder(id));
	}, [dispatch, id]);

	// update order
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
			<Title title={"admin orders"} />

			<div className="container rounded bg-white mt-5 mb-5">
				{loading ? (
					<Loading></Loading>
				) : (
					<div className="row">
						{error && <MessageBox variant="danger">{error}</MessageBox>}
						<div className="col-md-3 "></div>
						<div className="col-md-5 ">
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
											value={order?._id}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">user</label>
										<input
											type="text"
											className="form-control"
											value={order?.user?.name}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">paid At</label>
										<input
											type="text"
											className="form-control"
											value={order?.paidAt?.slice(0, 10)}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">itemsPrice</label>
										<input
											type="text"
											className="form-control"
											value={order?.itemsPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">taxPrice</label>
										<input
											type="text"
											className="form-control"
											value={order?.taxPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">shippingPrice</label>
										<input
											type="text"
											className="form-control"
											value={order?.shippingPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">totalPrice</label>
										<input
											type="text"
											className="form-control"
											value={order?.totalPrice}
											disabled
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Status</label>

										<Form.Select
											value={order?.orderStatus}
											className="form-control"
											onChange={(e) => setStatus(e.target.value)}
											disabled={order?.orderStatus === "Delivered"}>
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
										disabled={order?.orderStatus === "Delivered"}
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
