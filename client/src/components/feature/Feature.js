import React from "react";

import shipping from "./img/shipping.png";
import returnLOGO from "./img/return.png";
import gift from "./img/gift.png";
import contact from "./img/contact.png";

import "./index.css";

export default function Feature() {
	return (
		<div className="features">
			<div className="feature">
				<img src={shipping} alt="" className="featureIcon" />
				<span className="featureTitle">FREE SHIPPING</span>
				<span className="featureDesc">Free worldwide shipping on all orders.</span>
			</div>
			<div className="feature">
				<img className="featureIcon" src={returnLOGO} alt="" />
				<span className="featureTitle">30 DAYS RETURN</span>
				<span className="featureDesc">
					No question return and easy refund in 14 days.
				</span>
			</div>
			<div className="feature">
				<img className="featureIcon" src={gift} alt="" />
				<span className="featureTitle">GIFT CARDS</span>
				<span className="featureDesc">
					Buy gift cards and use coupon codes easily.
				</span>
			</div>
			<div className="feature">
				<img className="featureIcon" src={contact} alt="" />
				<span className="featureTitle">CONTACT US!</span>
				<span className="featureDesc">
					Keep in touch via email and support system.
				</span>
			</div>
		</div>
	);
}
