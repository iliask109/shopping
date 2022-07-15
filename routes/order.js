const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleOrder,
} = require("../controllers/orderContrillers");
const { isAuthenticatedUser } = require("../utils/authenticatedUser");
const router = express.Router();

router.route("/mine").get(isAuthenticatedUser, myOrders);

router.route("/").post(isAuthenticatedUser, newOrder);

router.route("/:id").get(isAuthenticatedUser, getSingleOrder);



module.exports = router;
