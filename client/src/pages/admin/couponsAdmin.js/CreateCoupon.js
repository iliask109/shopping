import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCouponAdmin } from "../../../actions/couponsAction";
import Loading from "../../../components/loading/Loading";

export default function CreateCoupon() {
	const [code, setCode] = useState("");
	const [discount, setDiscount] = useState("");
	const [dateEnd, setDateEnd] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createCouponAdmin({ code, discount, dateEnd }));
	};

	const createCoupon = useSelector((state) => state.createCoupon);
	const { success, loading } = createCoupon;

	if (success) {
		navigate("/admin/coupons");
		alert("Coupon created successfully");
	}
	return (
		<div>
			<div className="text-center pt-5">
				<h2>New Coupon</h2>
			</div>

			{loading ? (
				<Loading />
			) : (
				<div className="card">
					<div className="card-body">
						<form onSubmit={submitHandler}>
							<div className="form-group">
								<label htmlFor="inputName">Name Code</label>
								<input
									type="text"
									required
									className="form-control"
									placeholder="name Code"
									value={code}
									onChange={(e) => setCode(e.target.value)}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="inputEmail">Discount</label>
								<input
									type="number"
									required
									min={1}
									max={95}
									className="form-control"
									placeholder="Enter Discount"
									value={discount}
									onChange={(e) => setDiscount(e.target.value)}
								/>
							</div>

							<div className="form-row">
								<div className="form-group col-md-4">
									<label htmlFor="inputDate">Date</label>
									<input
										type="date"
										required
										className="form-control"
										value={dateEnd}
										onChange={(e) => {
											if (new Date(e.target.value) > new Date()) {
												setDateEnd(e.target.value);
											} else {
												alert("The date should be greater than today");
											}
										}}
									/>
									<small className="form-text text-muted">
										Choose a day when the coupon will end
									</small>
								</div>
							</div>

							<button
								className="btn btn-primary btn-block col-lg-2"
								type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
