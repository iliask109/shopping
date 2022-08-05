import React from "react";
import "./checkoutSteps.css";

export default function CheckoutSteps(props) {
	return (
		<div className="row justify-content-center mt-0">
			<div className="col-11 col-sm-9 col-md-12 col-lg-12 col-xl-12 text-center p-0 mt-3 mb-2">
				<ul id="progressbar">
					<li className={props.step1 ? "active" : ""} id="account">
						<strong>Account</strong>
					</li>
					<li className={props.step2 ? "active" : ""} id="personal">
						<strong>Shipping</strong>
					</li>
					<li className={props.step3 ? "active" : ""} id="payment">
						<strong>Payment</strong>
					</li>
					<li className={props.step4 ? "active" : ""} id="confirm">
						<strong>Finish</strong>
					</li>
				</ul>
			</div>
		</div>
	);
}
