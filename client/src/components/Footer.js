import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
	const [emailFooter, setEmailFooter] = useState("");
	const [errorFooter, setErrorFooter] = useState(false);

	const handleEmail = () => {
		var pattern = "^s*[w-+_]+(.[w-+_]+)*@[w-+_]+.[w-+_]+(.[w-+_]+)*s*$";
		if (emailFooter.match(pattern)) {
			setErrorFooter(false);
			window.location.reload();
		} else {
			setErrorFooter(true);
		}
	};

	return (
		<footer className="bg-dark text-center text-white">
			<div className=" p-4 pb-0">
				<section className="">
					<form action="">
						<div className="row d-flex justify-content-center">
							<div className="col-auto">
								<p className="pt-2">
									<strong>Sign up for our newsletter</strong>
								</p>
							</div>

							<div className="col-md-5 col-12">
								<div className="form-outline form-white mb-4">
									<input
										type="email"
										id="form5Example29"
										className="form-control"
										onChange={(e) => setEmailFooter(e.target.value)}
									/>
									<label className="form-label" htmlFor="form5Example29">
										{errorFooter ? "Email Address Invalid" : "Email Address"}
									</label>
								</div>
							</div>

							<div className="col-auto">
								<button
									type="button"
									className="btn btn-outline-light mb-4"
									onClick={() => handleEmail()}>
									Subscribe
								</button>
							</div>
						</div>
					</form>
				</section>
			</div>

			<div
				className="text-center p-3"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
				© 2022 Copyright:
				<Link className="text-white" to="/">
					Ilia Shkliar
				</Link>
			</div>
		</footer>
	);
}
