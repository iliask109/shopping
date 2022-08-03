const User = require("../models/UserModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/JwtToken");
const { sendVerificationEmail } = require("../utils/mailer");
const crypto = require("crypto");

exports.registerUser = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
	});

	sendVerificationEmail((order = null), user, "website registration ");

	sendToken(user, 200, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	// Checks if email and password is entered by user
	if (!email || !password) {
		return next(new ErrorHandler("Please enter email & password", 400));
	}

	// Finding user in database
	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid Email", 401));
	}

	// Checks if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid Password", 401));
	}

	sendToken(user, 200, res);
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

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
