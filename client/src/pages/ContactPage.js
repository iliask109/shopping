import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

export default function ContactPage() {
	const navigate = useNavigate();

	return (
		<div className="contact_page">
			<Title title={"Contact"} />

			<button className="goBack" onClick={() => navigate(-1)}>
				<ArrowBackIcon className="icon" />
			</button>
			<div className="container contact-form">
				<div className="contact-image">
					<img
						src="https://image.ibb.co/kUagtU/rocket_contact.png"
						alt="rocket_contact"
					/>
				</div>
				<form>
					<h3>Drop Us a Message</h3>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<input
									type="text"
									name="txtName"
									className="form-control"
									placeholder="Your Name *"
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									name="txtEmail"
									className="form-control"
									placeholder="Your Email *"
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									name="txtPhone"
									className="form-control"
									placeholder="Your Phone *"
								/>
							</div>
							<div className="form-group">
								<input
									type="submit"
									name="btnSubmit"
									className="btnContact"
									value="Send Message"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<textarea
									name="txtMsg"
									className="form-control"
									placeholder="Your Message *"
									style={{ width: "100%", height: "150px" }}></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
