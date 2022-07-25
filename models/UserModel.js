const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name"],
			maxLength: [30, "Your name cannot exceed 30 characters"],
		},
		email: {
			type: String,
			required: [true, "Please enter your email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please enter your password"],
			minlength: [6, "Your password must be longer than 6 characters"],
			select: false,
		},
		avatar: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png",
		},
		role: {
			type: String,
			default: "user",
		},
		likes: [
			{
				user: {
					type: mongoose.Schema.ObjectId,
					ref: "User",
					required: true,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		aboutMe: {
			type: String,
			default: "Something about me ",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		favorites: [
			{
				product: {
					type: mongoose.Schema.ObjectId,
					ref: "Product",
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	});
};

userSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString("hex");

	// Hash and set to resetPasswordToken
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// Set token expire time
	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model("User", userSchema);
