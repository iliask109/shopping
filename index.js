const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");
const couponRouter = require("./routes/coupon");

const cloudinary = require("cloudinary");

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./utils/errorMiddleware");
const path = require("path");
const app = express();

dotenv.config({ path: "config/config.env" });
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((con) => {
			console.log(`MongoDB Database connected`);
		});
};

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(limiter);

app.use("/api", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/orders", orderRouter);
app.use("/api/message", messageRouter);
app.use("/api/coupon", couponRouter);

app.use(errorMiddleware);
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(process.env.PORT || 8800, () => {
	connectDatabase();
	console.log("content to backend");
});
