const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
	},
	phone: {
		type: Number,
	},
	subject: {
		type: String,
	},
	message: {
		type: String,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Message", messageSchema);
