const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter product name"],
		trim: true,
		maxLength: [32, "Product name cannot exceed 32 characters"],
	},
	price: {
		type: Number,
		required: [true, "Please enter product price"],
		maxLength: [5, "Product name cannot exceed 5 characters"],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, "Please enter product description"],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	image: { type: String, required: true },
	category: {
		type: String,
		required: [true, "Please select category for this product"],
		enum: {
			values: [
				"Electronics",
				"Cameras",
				"Laptops",
				"Accessories",
				"Headphones",
				"Food",
				"Books",
				"Clothes/Shoes",
				"Beauty/Health",
				"Sports",
				"Outdoor",
				"Home",
			],
			message: "Please select correct category for product",
		},
	},
	seller: {
		type: String,
		required: [true, "Please enter product seller"],
	},
	stock: {
		type: Number,
		required: [true, "Please enter product stock"],
		maxLength: [5, "Product name cannot exceed 5 characters"],
		default: 0,
	},
	numOfSale: {
		type: Number,
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	discount: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
				required: true,
			},
			user_img: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
