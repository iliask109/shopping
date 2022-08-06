import React, { useState } from "react";
import Title from "../components/Title";
import { createMessage } from "../actions/messageActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";

export default function ContactPage() {
	const dispatch = useDispatch();

	const [errorEmail, setErrorEmail] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [subject, setSubject] = useState("The site is not working");
	const [message, setMessage] = useState("");

	const messageCreate = useSelector((state) => state.messageCreate);
	const { loading, error, success } = messageCreate;

	// valid email
	const handleEmail = (email) => {
		var pattern =
			"^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+";

		if (email.match(pattern)) {
			setErrorEmail(false);
			return true;
		} else {
			setErrorEmail(true);
			return false;
		}
	};

	// send message
	const sendMessage = () => {
		if (handleEmail(email))
			dispatch(createMessage({ name, email, phone, subject, message }));
	};

	if (success) {
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	}

	return (
		<div className="contact_page">
			<Title title={"Contact"} />

			<div className="container contact-form">
				<div className="contact-image">
					<img
						src="https://image.ibb.co/kUagtU/rocket_contact.png"
						alt="rocket_contact"
					/>
				</div>
				{loading ? (
					<Loading />
				) : (
					<form>
						<h3>Drop Us a Message</h3>
						{error && <MessageBox variant="danger">{error}</MessageBox>}
						{errorEmail && (
							<MessageBox variant="danger">The email is invalid</MessageBox>
						)}
						{success && (
							<MessageBox variant="success">
								The message has been sent , Thank you
							</MessageBox>
						)}
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<input
										type="text"
										name="txtName"
										className="form-control"
										placeholder="Your Name *"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										name="txtEmail"
										className="form-control"
										placeholder="Your Email *"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<input
										type="number"
										name="txtPhone"
										className="form-control"
										placeholder="Your Phone *"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<input
										type="button"
										name="btnSubmit"
										className="btnContact"
										value="Send Message"
										onClick={() => sendMessage()}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<select
										className="form-control"
										aria-label="Default select example"
										onChange={(e) => setSubject(e.target.value)}>
										<option value="The site is not working">
											The site is not working
										</option>
										<option value="The products do not appear">
											The products do not appear
										</option>
										<option value="specific product">specific product</option>
										<option value="payment">payment</option>
										<option value="Shipping">Shipping</option>
										<option value="Personal Information">
											Personal Information
										</option>
										<option value="Other ...">Other ...</option>
									</select>
								</div>
								<div className="form-group">
									<textarea
										name="txtMsg"
										className="form-control"
										placeholder="Your Message *"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										style={{ width: "100%", height: "150px" }}></textarea>
								</div>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
