const Message = require("../models/MessageModel");
const catchAsyncError = require("../utils/catchAsyncError");
const { sendVerificationEmail } = require("../utils/mailer");

exports.newMessage = catchAsyncError(async (req, res, next) => {
	try {
		const { name, email, phone, subject, message } = req.body;

		const newMessage = await Message.create({
			name,
			email,
			phone,
			subject,
			message,
		});

		res.status(200).json({
			success: true,
			newMessage,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

exports.allMessage = catchAsyncError(async (req, res, next) => {
	const messages = await Message.find();

	notCalledMessages = messages.filter((item) => item.verified === false);

	res.status(200).json(notCalledMessages);
});

exports.getSingleMessage = catchAsyncError(async (req, res, next) => {
	const message = await Message.findById(req.params.id);

	if (!message) {
		return next(new ErrorHandler("No message found with this ID", 404));
	}
	res.status(200).json(message);
});

exports.deleteSingleMessage = catchAsyncError(async (req, res, next) => {
	const message = await Message.findById(req.params.id);

	if (!message) {
		return next(new ErrorHandler("No message found with this ID", 404));
	}
	await message.remove();

	res.status(200).json({
		success: true,
	});
});

exports.confirmMessage = catchAsyncError(async (req, res, next) => {
	const { meg } = req.body;
	const message = await Message.findById(req.params.id);

	if (!message) {
		return next(new ErrorHandler("No message found with this ID", 404));
	}

	if (meg) {
		await sendVerificationEmail(
			(order = null),
			message,
			"Answer from the Shopping site",
			meg
		);
	}

	message.verified = true;

	await message.save();

	res.status(200).json({
		success: true,
	});
});
