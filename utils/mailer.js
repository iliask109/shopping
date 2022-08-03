const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const { orderMail, registerMail } = require("./htmlMail");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";

exports.sendVerificationEmail = (order, user, subject, message) => {
	const auth = new OAuth2(
		process.env.MAILING_ID,
		process.env.MAILING_SECRET,
		process.env.MAILING_REFRESH,
		oauth_link
	);
	auth.setCredentials({
		refresh_token: process.env.MAILING_REFRESH,
	});
	const accessToken = auth.getAccessToken();
	const stmp = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.EMAIL,
			clientId: process.env.MAILING_ID,
			clientSecret: process.env.MAILING_SECRET,
			refreshToken: process.env.MAILING_REFRESH,
			accessToken,
		},
	});
	const mailOptions = {
		from: "Shopping",
		to: order ? order.shippingAddress.address : user.email,
		subject: subject,
		html: order
			? orderMail(order, user)
			: message
			? message
			: registerMail(user),
	};
	stmp.sendMail(mailOptions, (err, res) => {
		if (err) return console.log(err.message);
		return res;
	});
};
