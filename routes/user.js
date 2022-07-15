const express = require("express");
const {
	getUserProfile,
	updatePassword,
	updateProfile,
	logout,
	createProductFavorite,
	deleteFavorite,
} = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../utils/authenticatedUser");
const router = express.Router();

router.route("/:id").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/update").put(isAuthenticatedUser, updateProfile);

router.route("/favorite").put(isAuthenticatedUser, createProductFavorite);
router.route("/favorite/:id").delete(isAuthenticatedUser, deleteFavorite);

router.route("/logout").get(logout);

module.exports = router;
