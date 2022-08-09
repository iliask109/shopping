const User = require("../models/UserModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/JwtToken");
const { sendVerificationEmail } = require("../utils/mailer");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//post  /api/auth/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;

	const regex = new RegExp(
		"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+-@#$%^&*])(?=.{6,})"
	);

	if (regex.test(password) === false) {
		throw new Error(
			"Your password must contain at least 6 characters: At least one number,at least one lower case letter, at least one upper case letter and at least one special character, like a fullstop."
		);
	}
	const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: "avatars",
		width: 150,
		crop: "scale",
	});

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	});

	// send email to user
	sendVerificationEmail((order = null), user, "website registration ");

	sendToken(user, 200, res);
});

//post /api/auth/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	// Checks if email and password is entered by user
	if (!email) {
		return next(new ErrorHandler("Please enter email ", 400));
	}
	if (!password) {
		return next(new ErrorHandler("Please enter password", 400));
	}

	// Finding user in database
	const user = await User.findOne({ email }).select("+password");

	// if user not find
	if (!user) {
		return next(new ErrorHandler("Invalid Email", 401));
	}

	// Checks if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);

	// if the password not correct
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid Password", 401));
	}

	sendToken(user, 200, res);
});

//post /api/auth/forgotPassword
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	// if user not find
	if (!user) {
		return next(new ErrorHandler("User not found with this email", 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// Create reset password url
	const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;

	const message = `<p>Your password reset token is as follow:</p>
	<hr />
	<p>
		<a
			href=${resetUrl}
			><button>Reset Password</button></a
		>
		<br /><br />If you have not requested this email, then ignore it.
	</p>`;

	try {
		//send email to user
		await sendVerificationEmail(
			(order = null),
			user,
			"forgotPassword ",
			message
		);

		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

//put /api/auth/resetPassword
exports.resetPassword = catchAsyncError(async (req, res, next) => {
	// Hash URL token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				"Password reset token is invalid or has been expired",
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not match", 400));
	}

	// Setup new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});
