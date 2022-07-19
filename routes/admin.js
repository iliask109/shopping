const express = require("express");
const {
	allOrders,
	updateOrder,
	deleteOrder,
} = require("../controllers/orderContrillers");
const {
	updateProduct,
	deleteProduct,
	newProduct,
	getAdminProducts,
} = require("../controllers/productControllers");
const {
	allUsers,
	getUserDetails,
	updateUser,
	deleteUser,
} = require("../controllers/userControllers");
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require("../utils/authenticatedUser");
const router = express.Router();
router
	.route("/user/:id")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

router
	.route("/users")
	.get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

router
	.route("/orders")
	.get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

router
	.route("/order/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router
	.route("/product/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin", "seller"), updateProduct)
	.delete(
		isAuthenticatedUser,
		authorizeRoles("admin", "seller"),
		deleteProduct
	);

router
	.route("/product/new")
	.post(isAuthenticatedUser, authorizeRoles("admin","seller"), newProduct);

module.exports = router;
