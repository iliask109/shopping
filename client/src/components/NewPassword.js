import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../actions/userActions";
import MessageBox from "./MessageBox";

export default function NewPassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { token } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, success } = useSelector((state) => state.forgotPassword);

	useEffect(() => {
		// if (error) {
		// 	alert.error(error);
		// 	dispatch(clearErrors());
		// }

		if (success) {
			setTimeout(() => {
				navigate("/");
			}, 2000);
		}
	}, [dispatch, alert, success, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(resetPassword(token, { password, confirmPassword }));
	};

	return (
		<div className=" container ">
			<div className="col-10 col-lg-5 ">
				<form className="p-3" onSubmit={submitHandler}>
					<h1 className="mb-3">New Password</h1>

					{error && <MessageBox variant="danger">{error}</MessageBox>}
					{success && (
						<MessageBox variant="success">
							The password has been changed
						</MessageBox>
					)}

					<div className="form-group">
						<label htmlFor="password_field">Password</label>
						<input
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="confirm_password_field">Confirm Password</label>
						<input
							type="password"
							className="form-control"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>

					<button type="submit" className="btn-primary btn-block rounded  py-3">
						Set Password
					</button>
				</form>
			</div>
		</div>
	);
}
