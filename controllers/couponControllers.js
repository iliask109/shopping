const Coupon = require("../models/CouponModel");
const catchAsyncError = require("../utils/catchAsyncError");

//post /api/coupon
exports.newCoupon = catchAsyncError(async (req, res, next) => {
	try {
		const { code, discount, dateStart, dateEnd } = req.body;

		// create new message
		const newCoupon = await Coupon.create({
			code,
			discount,
			dateStart,
			dateEnd,
		});

		res.status(200).json({
			success: true,
			newCoupon,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//get /api/coupon
exports.getAllCoupons = catchAsyncError(async (req, res, next) => {
	const coupons = await Coupon.find();

	newCoupons = coupons.filter((item) => item.dateEnd > Date.now());

	res.status(200).json(newCoupons);
});

//delete /api/coupon
exports.deleteCoupon = catchAsyncError(async (req, res, next) => {
	const coupon = await Coupon.findById(req.params.id);

	if (!coupon) {
		return next(new ErrorHandler("No coupon found with this ID", 404));
	}
	await coupon.remove();

	res.status(200).json({
		success: true,
	});
});
