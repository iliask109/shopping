const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/JwtToken");
const cloudinary = require("cloudinary");

//get   /api/user/:id
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

//put   /api/user/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	// Check previous user password
	const isMatched = await user.comparePassword(req.body.oldPassword);
	if (!isMatched) {
		return next(new ErrorHandler("Old password is incorrect"));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendToken(user, 200, res);
});

//put   /api/user/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		aboutMe: req.body.aboutMe,
	};

	// Update avatar
	if (req.body.avatar !== "") {
		const user = await User.findById(req.user.id);

		const image_id = user.avatar.public_id;
		const res = await cloudinary.v2.uploader.destroy(image_id);

		const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: "avatars",
			width: 150,
			crop: "scale",
		});

		newUserData.avatar = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json(user);
});

// Admin Routes

//get   /api/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

//get   /api/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User does not found with id: ${req.params.id}`)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

//put   /api/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

//delete   /api/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User does not found with id: ${req.params.id}`)
		);
	}

	// Remove avatar from cloudinary
	const image_id = user.avatar.public_id;
	await cloudinary.v2.uploader.destroy(image_id);

	await user.remove();

	res.status(200).json({
		success: true,
	});
});

//put  /api/user/favorite
exports.createProductFavorite = catchAsyncError(async (req, res, next) => {
	const { productId } = req.body;

	const user = await User.findById(req.user.id);
	const product = await Product.findById(productId);

	const favorite = {
		product: productId,
		name: product.name,
		price: product.price,
		image: product.images[0].url,
		stock: product.stock,
	};

	const isFavorite = user.favorites.find(
		(r) => r.product.toString() === productId.toString()
	);

	if (isFavorite) {
	} else {
		user.favorites.push(favorite);
		await user.save({ validateBeforeSave: false });
	}

	res.status(200).json(user);
});

//delete   /api/user/favorite/:id
exports.deleteFavorite = catchAsyncError(async (req, res, next) => {
	const favorite = req.params.id;
	const user = await User.findById(req.user.id);

	await user.favorites
		.find((f) => f.product.toString() === favorite.toString())
		.remove();

	user.save();

	res.status(200).json({
		success: true,
		user,
	});
});

//put  /api/user/likes
exports.createLikes = catchAsyncError(async (req, res, next) => {
	const { sellerId } = req.body;

	const user = await User.findById(req.user.id);
	const userSeller = await User.findById(sellerId);

	const likes = {
		user: user._id,
	};
	const isLiked = userSeller.likes.find(
		(r) => r.user.toString() === user._id.toString()
	);
	if (isLiked) {
	} else {
		userSeller.likes.push(likes);
		await userSeller.save({ validateBeforeSave: false });
	}

	res.status(200).json(user);
});

//delete   /api/user/likes
exports.deleteLikes = catchAsyncError(async (req, res, next) => {
	const sellerId = req.params.id;

	const user = await User.findById(req.user.id);
	const userSeller = await User.findById(sellerId);

	await userSeller.likes
		.find((f) => f.user.toString() === user._id.toString())
		.remove();

	userSeller.save();

	res.status(200).json({
		success: true,
		userSeller,
	});
});
