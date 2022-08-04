const express = require("express");
const { newMessage, allMessage, getSingleMessage, deleteSingleMessage, confirmMessage } = require("../controllers/messageControllers");
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require("../utils/authenticatedUser");

const router = express.Router();

router.route("/").post(newMessage);
router.route("/").get(isAuthenticatedUser, authorizeRoles("admin"), allMessage);
router.route("/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleMessage);
router.route("/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSingleMessage);
router.route("/:id").put(isAuthenticatedUser, authorizeRoles("admin"), confirmMessage);

module.exports = router;
