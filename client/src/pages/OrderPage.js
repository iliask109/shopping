import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "../components/Title";

export default function OrderPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	return (
		<div>
			<Title title={"Order"} />
			<button className="goBack" onClick={() => navigate(-1)}>
				<ArrowBackIcon className="icon" />
			</button>
			<div className="container mt-5 d-flex justify-content-center order_page  p-5 ">
				<div className="card p-4 mt-3">
					<div className="first d-flex justify-content-between align-items-center mb-3">
						<div className="info">
							<span className="d-block name">Thank you, {userInfo.name}</span>
							<span className="order">Order - {id}</span>
						</div>

						<img src="https://i.imgur.com/NiAVkEw.png" width="40" alt="order" />
					</div>
					<div className="detail">
						<span className="d-block summery">
							Your order has been dispatched. we are delivering you order.
						</span>
					</div>
					<hr />
					<div className="text">
						<span className="d-block new mb-1">{shippingAddress.fullName}</span>
					</div>
					<span className="d-block address mb-3">
						{shippingAddress.address} {shippingAddress.city}{" "}
						{shippingAddress.country} , {shippingAddress.postalCode}
					</span>
					<div
						className="last d-flex align-items-center mt-3"
						style={{ cursor: "pointer" }}>
						<span className="address-line" onClick={() => navigate("/")}>
							Go back to Home Page
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
