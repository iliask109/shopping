import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ForgotPassword, register, signin } from "../../actions/userActions";
import MessageBox from "../MessageBox";
import Loading from "../loading/Loading";

import "./auth.scss";
import {
	USER_REGISTER_RESET,
	USER_SIGNIN_RESET,
} from "../../constants/userConstants";
export default function Auth(props) {
	const [isLogin, setIsLogin] = useState(true);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [forgotPassword, setForgotPassword] = useState(false);
	const [emailPass, setEmailPass] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	let lowerCase = document.getElementById("lower");
	let upperCase = document.getElementById("upper");
	let numberCase = document.getElementById("number");
	let specialCase = document.getElementById("special");
	let lengthCase = document.getElementById("length");

	function checkPassword(data) {
		const lower = new RegExp("(?=.*[a-z])");
		const upper = new RegExp("(?=.*[A-Z])");
		const number = new RegExp("(?=.*[0-9])");
		const special = new RegExp("(?=.*[!@#$%^&*+])");
		const length = new RegExp("(?=.{6,})");

		if (lower.test(data)) {
			lowerCase.classList.add("valid");
		} else {
			lowerCase.classList.remove("valid");
		}
		if (upper.test(data)) {
			upperCase.classList.add("valid");
		} else {
			upperCase.classList.remove("valid");
		}
		if (number.test(data)) {
			numberCase.classList.add("valid");
		} else {
			numberCase.classList.remove("valid");
		}
		if (special.test(data)) {
			specialCase.classList.add("valid");
		} else {
			specialCase.classList.remove("valid");
		}
		if (length.test(data)) {
			lengthCase.classList.add("valid");
		} else {
			lengthCase.classList.remove("valid");
		}
	}

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const userSignin = useSelector((state) => state.userSignin);
	const {
		userInfo: userInfoSignin,
		loading: loadingSignin,
		error: errorSignin,
	} = userSignin;

	const forgotPasswordReducer = useSelector((state) => state.forgotPassword);
	const { message } = forgotPasswordReducer;

	const dispatch = useDispatch();

	// validate email
	function validateEmail(emailField) {
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if (reg.test(emailField) == false) {
			alert("Invalid Email Address");
			return false;
		}

		return true;
	}

	// Login or register
	const submitHandler = () => {
		if (isLogin) {
			dispatch(signin(email, password));
		} else {
			if (password !== confirmPassword) {
				alert("Password and confirm password are not match");
			} else {
				if (validateEmail(email)) {
					dispatch(register(fullName, email, password, avatar));
				}
			}
		}
	};

	useEffect(() => {
		if (userInfo || userInfoSignin) {
			setIsLogin(true);
			setFullName("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			props.onHide();
		}
		if (message) {
			setForgotPassword(false);
		}
	}, [userInfo, userInfoSignin, props, message]);

	// forgot password
	const passwordHandler = () => {
		dispatch(ForgotPassword(emailPass));
	};


	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="modal">
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					{isLogin ? "Login" : "Register"}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{loading || loadingSignin ? (
					<Loading></Loading>
				) : (
					<div className="container">
						<div className="row">
							{isLogin ? (
								<h1>
									<i className="fa fa-lock"></i> Login
								</h1>
							) : (
								<h1>
									<i className="fa-solid fa-address-card"></i> Register
								</h1>
							)}
						</div>
						<br />
						<br />
						{!isLogin && (
							<>
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fa fa-user icon"></i>
										</span>
									</div>
									<input
										type="text"
										name="fullName"
										className="form-control"
										placeholder="full name"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
									/>
								</div>
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fa fa-user icon"></i>
										</span>
									</div>
									<input
										type="text"
										name="avatar"
										className="form-control"
										placeholder="Avatar image"
										value={avatar}
										onChange={(e) => setAvatar(e.target.value)}
									/>
								</div>
							</>
						)}
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fa-solid fa-at"></i>{" "}
								</span>
							</div>
							<input
								type="text"
								name="email"
								className={`form-control ${
									errorSignin === "Invalid Email" ? "error" : ""
								}`}
								placeholder="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fa fa-key icon"></i>
								</span>
							</div>
							<input
								type={`${showPassword ? "text" : "password"}`}
								name="password"
								className={`form-control ${
									errorSignin === "Invalid Password" ? "error" : ""
								}`}
								placeholder="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onKeyUp={() => !isLogin && checkPassword(password)}
							/>
							<span
								id="toggleBtn"
								className={`${showPassword ? "hide" : ""}`}
								onClick={() => setShowPassword(!showPassword)}></span>
						</div>

						{!isLogin && (
							<>
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fa-solid fa-lock"></i>{" "}
										</span>
									</div>
									<input
										type="password"
										name="confirmPassword"
										className="form-control"
										placeholder="confirm password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
								<div className="checkPassword mb-4">
									<div className="validation">
										<ul>
											<li id="lower">At least one lowercase character</li>
											<li id="upper">At least one uppercase character</li>
											<li id="number">At least one number</li>
											<li id="special">At least one special character</li>
											<li id="length">At least 6 characters</li>
										</ul>
									</div>
								</div>
							</>
						)}

						<button
							type="button"
							className="btn btn-success"
							onClick={() => submitHandler()}>
							<span className="glyphicon glyphicon-off"></span>{" "}
							{isLogin ? "Login" : "Register"}
						</button>
						<hr />

						<div className="footer">
							{error || errorSignin ? (
								<MessageBox variant="danger">{error || errorSignin}</MessageBox>
							) : (
								""
							)}

							{isLogin ? (
								<>
									<p>
										Don't have an Account!{" "}
										<Link
											to="#"
											onClick={() => {
												dispatch({ type: USER_SIGNIN_RESET });
												setIsLogin(false);
											}}>
											Sign Up Here
										</Link>
									</p>

									<p onClick={() => setForgotPassword(true)}>
										Forgot <Link to="#">Password</Link>
									</p>
									{forgotPassword && (
										<div>
											<input
												placeholder="email"
												className="m-2 p-1 rounded"
												onChange={(e) => setEmailPass(e.target.value)}
											/>
											<Button onClick={() => passwordHandler()}>send</Button>
										</div>
									)}
									{message && (
										<MessageBox variant="success">{message}</MessageBox>
									)}
								</>
							) : (
								<p>
									If you have an Account?
									<Link
										to="#"
										onClick={() => {
											dispatch({ type: USER_REGISTER_RESET });
											setIsLogin(true);
										}}>
										Login Here
									</Link>
								</p>
							)}
						</div>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
