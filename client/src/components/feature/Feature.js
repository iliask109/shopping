import React from "react";

import shipping from "./img/shipping.png";
import returnLOGO from "./img/return.png";
import gift from "./img/gift.png";
import contact from "./img/contact.png";

import "./index.css";

export default function Feature() {
	return (
		<div class="features">
			<div class="feature">
				<img src={shipping} alt="" class="featureIcon" />
				<span class="featureTitle">FREE SHIPPING</span>
				<span class="featureDesc">Free worldwide shipping on all orders.</span>
			</div>
			<div class="feature">
				<img class="featureIcon" src={returnLOGO} alt="" />
				<span class="featureTitle">30 DAYS RETURN</span>
				<span class="featureDesc">
					No question return and easy refund in 14 days.
				</span>
			</div>
			<div class="feature">
				<img class="featureIcon" src={gift} alt="" />
				<span class="featureTitle">GIFT CARDS</span>
				<span class="featureDesc">
					Buy gift cards and use coupon codes easily.
				</span>
			</div>
			<div class="feature">
				<img class="featureIcon" src={contact} alt="" />
				<span class="featureTitle">CONTACT US!</span>
				<span class="featureDesc">
					Keep in touch via email and support system.
				</span>
			</div>
		</div>
	);
}
