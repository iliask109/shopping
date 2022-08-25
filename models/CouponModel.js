const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	discount: {
		type: Number,
		required: true,
	},
	dateStart: {
		type: Date,
		default: Date.now(),
	},
	dateEnd: {
		type: Date,
		required: true,
	},
	
});

module.exports = mongoose.model("Coupons", couponSchema);
