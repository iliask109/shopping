const express = require("express");
const {
	newProduct,
	getProducts,
	getSingleProduct,
	createProductReview,
	getProductReviews,
	deleteReview,
	getSellerProducts,
	getSellerProduct,
} = require("../controllers/productControllers");
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require("../utils/authenticatedUser");

const router = express.Router();

router.route("/products").get(getProducts);
router
	.route("/products/seller")
	.get(isAuthenticatedUser, authorizeRoles("seller"), getSellerProducts);

router.route("/products/seller/:id").get(getSellerProduct);
router.route("/products/:id").get(getSingleProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
