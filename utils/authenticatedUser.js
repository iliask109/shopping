const User = require("../models/UserModel");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

// Checks if user is authenticated or not

exports.isAuthenticatedUser = async (req, res, next) => {

  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
};

// Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
