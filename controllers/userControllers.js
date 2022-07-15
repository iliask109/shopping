const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/JwtToken");

// Get currently logged in user details   =>   /api/v1/user/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change password   =>  /api/v1/user/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect"));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update user profile   =>   /api/v1/user/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json(user);
});

// Logout user   =>   /api/v1/user/logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Admin Routes

// Get all users   =>   /api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});

exports.createProductFavorite = catchAsyncError(async (req, res, next) => {
  const { productId } = req.body;

  const user = await User.findById(req.user.id);
  const product = await Product.findById(productId);

  const favorite = {
    product: productId,
    name: product.name,
  };

  const isFavorite = user.favorites.find(
    (r) => r.product.toString() === productId.toString()
  );

  if (isFavorite) {
  } else {
    user.favorites.push(favorite);
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json(user);
});

exports.deleteFavorite = catchAsyncError(async (req, res, next) => {
  const favorite = req.params.id;
  const user = await User.findById(req.user.id);

  await user.favorites
    .find((f) => f.product.toString() === favorite.toString())
    .remove();

  user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
