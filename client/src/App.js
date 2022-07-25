import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import "./app.scss";
import CartPage from "./pages/CartPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentPage from "./pages/PaymentPage";
import Placeorder from "./pages/Placeorder";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import SellerRoute from "./components/SellerRoute";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrder from "./pages/MyOrder";
import EditProfilePage from "./pages/EditProfilePage";
import DasboardAdmin from "./pages/admin/DasboardAdmin";
import AdminRoute from "./components/AdminRoute";
import UserAdmin from "./pages/admin/UserAdmin";
import Sidebar from "./components/sidebar/Sidebar";
import SingleUserAdmin from "./pages/admin/SingleUserAdmin";
import ProductAdmin from "./pages/admin/ProductAdmin";
import SingleProductAdmin from "./pages/admin/SingleProductAdmin";
import CreateProduct from "./pages/admin/CreateProduct";
import OrderAdmin from "./pages/admin/OrderAdmin";
import SingleOrderAdmin from "./pages/admin/SingleOrderAdmin";
import FiltersPage from "./pages/FiltersPage";
import Footer from "./components/Footer";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import ReviewsSingel from "./pages/admin/ReviewsSingel";
import ProductsSeller from "./pages/seller/ProductsSeller";
import SingleProductSeller from "./pages/seller/SingelProductSeller";
import ContactPage from "./pages/ContactPage";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import SalesPage from "./pages/SalesPage";
import SellerProfile from "./pages/SellerProfile";
function App() {
	const sidebarReducer = useSelector((state) => state.sidebarReducer);
	const { Blur } = sidebarReducer;

	const Mobile = useMediaQuery({ query: "(min-width: 700px)" });

	return (
		<div className="main">
			<BrowserRouter>
				<Navbar />
				<div className="homeContainer ">
					{Mobile && <Sidebar />}

					<div
						className="container"
						style={{ filter: `${Blur ? "blur(5px)" : ""}` }}>
						<Routes>
							<Route path="/" expect element={<Home />} />
							<Route path="/seller/:id"  element={<SellerProfile />} />
							<Route path="/contact" element={<ContactPage />} />
							<Route path="/search" element={<FiltersPage />} />
							<Route path="/sales" element={<SalesPage />} />
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
								path="/me/updatePassowrd"
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
