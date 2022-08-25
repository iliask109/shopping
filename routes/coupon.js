const express = require("express");
const {
	newCoupon,
	getAllCoupons,
	deleteCoupon,
} = require("../controllers/couponControllers");
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require("../utils/authenticatedUser");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, authorizeRoles("admin"), newCoupon);
router.route("/").get(getAllCoupons);
router
	.route("/:id")
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);

module.exports = router;
