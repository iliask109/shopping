const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Create new product   =>   /api/v1/admin/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
	const products = await Product.find();

	var sortBySale = products.sort(function (a, b) {
		return b.numOfSale - a.numOfSale;
	});

	res.status(200).json(sortBySale);
});

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncError(async (req, res, next) => {
	const pageSize = req.query.pageSize || "";
	const productsCount = await Product.countDocuments();
	const page = Number(req.query.pageNumber) || 1;
	const name = req.query.name || "";
	const category = req.query.category || "";
	const discount = req.query.discount || "";
	const order = req.query.order || "";
	const min =
		req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
	const max =
		req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
	const rating =
		req.query.rating && Number(req.query.rating) !== 0
			? Number(req.query.rating)
			: 0;

	const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
	const categoryFilter = category ? { category } : {};
	const discountFilter = discount ? { discount: { $gte: discount } } : {};
	const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
	const ratingFilter = rating ? { ratings: { $gte: rating } } : {};
	const sortOrder =
		order === "lowest"
			? { price: 1 }
			: order === "highest"
			? { price: -1 }
			: order === "toprated"
			? { rating: -1 }
			: { _id: -1 };

	const products = await Product.find({
		...priceFilter,
		...nameFilter,
		...discountFilter,
		...categoryFilter,
		...ratingFilter,
	})
		.sort(sortOrder)
		.skip(pageSize * (page - 1))
		.limit(pageSize);
	res.send({ products, page, pageSize, productsCount });
});

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
	const id = req.params.id.trim();

	const product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json(product);
});

exports.getSellerProduct = catchAsyncError(async (req, res, next) => {
	const id = req.params.id.trim();
	const products = await Product.find({ user: id });
	if (!products) {
		return next(new ErrorHandler("products not found", 404));
	}
	res.status(200).json(products);
});

// Update Product   =>   /api/v1/product/admin/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	if (
		req.user.role === "admin" ||
		req.user._id.toString() === product.user.toString()
	) {
		product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		});
	}
	res.status(200).json({
		success: true,
		product,
	});
});

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	await product.remove();

	res.status(200).json({
		success: true,
		message: "Product is deleted.",
	});
});

exports.createProductReview = catchAsyncError(async (req, res, next) => {
	const { rating, comment, productId } = req.body;


	const review = {
		user: req.user._id,
		user_img: req.user.avatar,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const product = await Product.findById(productId);

	const isReviewed = product.reviews.find(
		(r) => r.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		product.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	product.ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);

	const reviews = product.reviews.filter(
		(review) => review._id.toString() !== req.query.id.toString()
	);

	const numOfReviews = reviews.length;

	const ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});

exports.getSellerProducts = catchAsyncError(async (req, res, next) => {
	const products = await Product.find({ user: req.user.id.toString() });

	res.status(200).json({ products });
});
