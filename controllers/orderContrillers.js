const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const catchAsyncError = require("../utils/catchAsyncError");
const { sendVerificationEmail } = require("../utils/mailer");

// Create a new order   =>  /api/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
	try {
		const {
			orderItems,
			shippingAddress,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			paymentInfo,
		} = req.body;

		const order = await Order.create({
			orderItems,
			shippingAddress,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			paymentInfo,
			paidAt: Date.now(),
			user: req.user._id,
		});

		const user = await User.findById(order.user);

		sendVerificationEmail(order, user, "The order has been placed ");

		res.status(200).json({
			success: true,
			order,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

exports.myOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.find({ user: req.user.id });
	res.send(orders);
});

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (!order) {
		return next(new ErrorHandler("No Order found with this ID", 404));
	}

	res.status(200).json(order);
});

exports.allOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		totalAmount,
		orders,
	});
});

exports.updateOrder = catchAsyncError(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler("You have already delivered this order", 400));
	}

	order.orderItems.forEach(async (item) => {
		const product = await Product.findById(item.product.toString());
		product.numOfSale = product.numOfSale + item.qty;

		await product.save({ validateBeforeSave: false });
	});

	order.orderStatus = req.body.status;
	order.deliveredAt = Date.now();

	await order.save();

	res.status(200).json({
		success: true,
	});
});

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler("No Order found with this ID", 404));
	}

	await order.remove();

	res.status(200).json({
		success: true,
	});
});
