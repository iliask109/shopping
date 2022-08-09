import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

//components
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./helpers/routes/PrivateRoute";
import SellerRoute from "./helpers/routes/SellerRoute";
import AdminRoute from "./helpers/routes/AdminRoute";
import Footer from "./components/Footer";
import NewPassword from "./components/NewPassword";

//pages
import Home from "./pages/Home";
import ProductPage from "./pages/product/ProductPage";
import CartPage from "./pages/order/CartPage";
import ShippingAddressPage from "./pages/order/ShippingAddressPage";
import PaymentPage from "./pages/order/PaymentPage";
import Placeorder from "./pages/order/Placeorder";
import ErrorPage from "./pages/ErrorPage";
import OrderPage from "./pages/order/OrderPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MyOrder from "./pages/order/MyOrder";
import EditProfilePage from "./pages/profile/EditProfilePage";
import FiltersPage from "./pages/product/FiltersPage";
import ContactPage from "./pages/ContactPage";
import SalesPage from "./pages/product/SalesPage";
import SellerProfile from "./pages/profile/SellerProfile";
import AllProducts from "./pages/product/AllProducts";
import About from "./pages/About";

//pages admin and seller
import DasboardAdmin from "./pages/admin/DasboardAdmin";
import UserAdmin from "./pages/admin/userAdmin/UserAdmin";
import SingleUserAdmin from "./pages/admin/userAdmin/SingleUserAdmin";
import ProductAdmin from "./pages/admin/productAdmin/ProductAdmin";
import SingleProductAdmin from "./pages/admin/productAdmin/SingleProductAdmin";
import CreateProduct from "./pages/admin/productAdmin/CreateProduct";
import OrderAdmin from "./pages/admin/orderAdmin/OrderAdmin";
import SingleOrderAdmin from "./pages/admin/orderAdmin/SingleOrderAdmin";
import ReviewsAdmin from "./pages/admin/reviewsAdmin/ReviewsAdmin";
import ReviewsSingel from "./pages/admin/reviewsAdmin/ReviewsSingel";
import ProductsSeller from "./pages/seller/ProductsSeller";
import SingleProductSeller from "./pages/seller/SingelProductSeller";
import SingleMessage from "./pages/admin/SingleMessage";

import "./app.scss";

function App() {
	const sidebarReducer = useSelector((state) => state.sidebarReducer);
	const { Blur } = sidebarReducer;

	const Mobile = useMediaQuery({ query: "(min-width: 700px)" });

	return (
		<div className="main">
			<BrowserRouter>
				<Navbar />
				<div className="homeContainer ">
					<div
						className="container app"
						style={{ filter: `${Blur && !Mobile ? "blur(5px)" : ""}` }}>
						<Routes>
							<Route path="/" expect element={<Home />} />
							<Route path="/password/reset/:token" element={<NewPassword />} />
							<Route path="/seller/:id" element={<SellerProfile />} />
							<Route path="/contact" element={<ContactPage />} />
							<Route path="/about" element={<About />} />
							<Route path="/search" element={<FiltersPage />} />
							<Route path="/sales" element={<SalesPage />} />
							<Route path="/products" element={<AllProducts />} />
							<Route
								path="/search/category/:category"
								expect
								element={<FiltersPage />}
							/>
							<Route path="/search/name/:name" element={<FiltersPage />} />
							<Route path="/products/:id" element={<ProductPage />} />
							<Route path="/cart" element={<CartPage />} />
							<Route path="/shipping" element={<ShippingAddressPage />} />
							<Route
								path="/payment"
								element={
									<PrivateRoute>
										<PaymentPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/placeorder"
								element={
									<PrivateRoute>
										<Placeorder />
									</PrivateRoute>
								}
							/>
							<Route
								path="/order/:id"
								element={
									<PrivateRoute>
										<OrderPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/me"
								element={
									<PrivateRoute>
										<ProfilePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/me/order/:id"
								element={
									<PrivateRoute>
										<MyOrder />
									</PrivateRoute>
								}
							/>
							<Route
								path="/me/updateUser"
								element={
									<PrivateRoute>
										<EditProfilePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/me/updatePassword"
								element={
									<PrivateRoute>
										<EditProfilePage />
									</PrivateRoute>
								}
							/>
							<Route path="/error" expect element={<ErrorPage />} />
							<Route
								path="/admin"
								expect
								element={
									<AdminRoute>
										<DasboardAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/users"
								element={
									<AdminRoute>
										<UserAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/users/:id"
								element={
									<AdminRoute>
										<SingleUserAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/products"
								element={
									<AdminRoute>
										<ProductAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/products/:id"
								element={
									<AdminRoute>
										<SingleProductAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/products/new"
								element={
									<AdminRoute>
										<CreateProduct />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/orders"
								element={
									<AdminRoute>
										<OrderAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/orders/:id"
								element={
									<AdminRoute>
										<SingleOrderAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/reviews"
								element={
									<AdminRoute>
										<ReviewsAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/reviews/:id"
								element={
									<AdminRoute>
										<ReviewsSingel />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/message/:id"
								element={
									<AdminRoute>
										<SingleMessage />
									</AdminRoute>
								}
							/>
							<Route
								path="/seller"
								element={
									<SellerRoute>
										<ProductsSeller />
									</SellerRoute>
								}
							/>
							<Route
								path="/seller/product/:id"
								element={
									<SellerRoute>
										<SingleProductSeller />
									</SellerRoute>
								}
							/>
							<Route
								path="/seller/products/new"
								element={
									<SellerRoute>
										<CreateProduct />
									</SellerRoute>
								}
							/>
						</Routes>
					</div>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
