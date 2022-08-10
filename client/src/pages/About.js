import React from "react";

export default function About() {
	return (
		<div className="about_page">
			<div class="about-section">
				<h1 style={{ color: "gold" }}>About Us</h1>
				<p>Shopping, virtual store </p>
				<p>
					We have built a useful shopping site where users can order things they
					need from home.
				</p>
				<p>
					The store is adapted to all devices. There is an option to contact the
					management regarding problems on the site
				</p>
				<p>
					The shipment from the factory approximately 7-10 days after the order,
					you will receive a message by email separately for the shipment
				</p>
				<h2>We hope you enjoy the site and the products </h2>
			</div>

		

			<h2>Our Team</h2>
			<div class="row">
				<div class="column">
					<div class="card">
						<img
							src="https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.6435-9/31275700_1087892948016186_3112127912497643520_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5FOBHlm9eZQAX8WwAZl&tn=k6Z29xHlS5pm-D1G&_nc_ht=scontent.fsdv1-2.fna&oh=00_AT_eseu30OBm5Jpxl06SZrNdZ-NDDA-krdcG9CGpcvJA2g&oe=631550DB"
							alt="ilia"
							style={{ width: "100%" }}
						/>
						<div class="container">
							<h2>Ilia Shkliar</h2>
							<p class="title">Owner & Developer</p>
							<p>26 years old, studying programming</p>
							<p>iliask109@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
