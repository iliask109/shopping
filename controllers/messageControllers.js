const Message = require("../models/MessageModel");
const catchAsyncError = require("../utils/catchAsyncError");
const { sendVerificationEmail } = require("../utils/mailer");

//post /api/message
exports.newMessage = catchAsyncError(async (req, res, next) => {
	try {
		const { name, email, phone, subject, message } = req.body;

		// create new message
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

//get /api/message
exports.allMessage = catchAsyncError(async (req, res, next) => {
	const messages = await Message.find();

	// Send all unconfirmed emails
	notCalledMessages = messages.filter((item) => item.verified === false);

	res.status(200).json(notCalledMessages);
});

//get /api/message/:id
exports.getSingleMessage = catchAsyncError(async (req, res, next) => {
	const message = await Message.findById(req.params.id);

	if (!message) {
		return next(new ErrorHandler("No message found with this ID", 404));
	}
	res.status(200).json(message);
});

//delete /api/message/:id
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

//put /api/message/:id
exports.confirmMessage = catchAsyncError(async (req, res, next) => {
	const { meg } = req.body;
	const message = await Message.findById(req.params.id);

	if (!message) {
		return next(new ErrorHandler("No message found with this ID", 404));
	}

	// If there is a message from the admin then a message will be sent to the user
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
