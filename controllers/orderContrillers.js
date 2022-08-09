const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const catchAsyncError = require("../utils/catchAsyncError");
const { sendVerificationEmail } = require("../utils/mailer");

//post   =>  /api/orders
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
		console.log(orderItems);

		// create new order
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

		// send order details to user email
		sendVerificationEmail(order, user, "The order has been placed ");

		res.status(200).json({
			success: true,
			order,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//get   =>  /api/orders/mine
exports.myOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.find({ user: req.user.id });
	res.send(orders);
});

//get   =>  /api/orders/:id
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

//get   =>  /api/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.find();

	// Total bought from the site
	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		totalAmount,
		orders,
	});
});

//put   =>  /api/admin/orders/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler("You have already delivered this order", 400));
	}

	// How many did you buy in total from that product
	order.orderItems.forEach(async (item) => {
		const product = await Product.findById(item.product.toString());
		product.numOfSale = product.numOfSale + item.qty;

		await product.save({ validateBeforeSave: false });
	});

	//update stock
	order.orderItems.forEach(async (item) => {
		await updateStock(item.product, item.qty);
	});

	// change status order
	order.orderStatus = req.body.status;
	order.deliveredAt = Date.now();

	await order.save();

	res.status(200).json({
		success: true,
	});
});

async function updateStock(id, quantity) {
	const product = await Product.findById(id);

	product.stock = product.stock - quantity;

	await product.save({ validateBeforeSave: false });
}

//delete   =>  /api/admin/orders/:id
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
