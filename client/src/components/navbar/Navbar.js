import React, { useRef, useState } from "react";
import { SiShopware } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import Sidebar from "../sidebar/Sidebar";

import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import Auth from "../auth/Auth";
import { useMediaQuery } from "react-responsive";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import useClickOutside from "../../helpers/clickOutside";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { removeFromCart } from "../../actions/cartActions";
import Cookies from "js-cookie";

import Lists from "../sidebar/list";
import { deleteFavoriteUser, signout } from "../../actions/userActions";

export default function Navbar() {
	const [modalShow, setModalShow] = useState(false);
	const [name, setName] = useState("");
	const [cartOpen, setCartOpen] = useState(false);
	const [userOpen, setUserOpen] = useState(false);
	const [favoriteOpen, setFavoriteOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const Mobile = useMediaQuery({ query: "(max-width: 700px)" });

	const miniCart = useRef(null);
	const dropUser = useRef(null);
	const dropFavorite = useRef(null);

	useClickOutside(miniCart, () => {
		setCartOpen(false);
	});
	useClickOutside(dropUser, () => {
		setUserOpen(false);
	});
	useClickOutside(dropFavorite, () => {
		setFavoriteOpen(false);
	});

	// search
	const handleSearch = () => {
		if (name) {
			navigate(`/search/name/${name}`);
			setName("");
		}
	};

	function handle(e) {
		if (e.key === "Enter") {
			handleSearch();
		}
	}

	// if the token Expired
	if (!Cookies.get("token")) {
		if (userInfo) {
			alert("The user is disconnected");
			dispatch(signout());
		}
	}

	// remove item from the cart
	const removeItem = (id) => {
		dispatch(removeFromCart(id));
	};

	// logout
	const signoutHandler = () => {
		dispatch(signout());
	};

	// delete favorite
	const deleteFavoriteId = (productId) => {
		dispatch(deleteFavoriteUser(productId));
	};

	return (
		<div className="navbar col-lg-12">
			<div className="wrapper ">
				{Mobile && <Sidebar />}
				<div className="logo ">
					<Link to="/" style={{ textDecoration: "none" }}>
						<SiShopware style={{ marginRight: "10px" }} />
						<span>Shoppping</span>
					</Link>
				</div>
				<div className="search">
					<input
						type="search"
						required
						placeholder="Search..."
						value={name}
						onChange={(e) => setName(e.target.value)}
						onKeyPress={(e) => handle(e)}
					/>
					<SearchOutlinedIcon
						type="submit"
						style={{ cursor: "pointer" }}
						onClick={() => handleSearch()}
					/>
				</div>
				<div className="items">
					<div className="item">
						<Link to="/about" style={{ textDecoration: "none" }}>
							{" "}
							About
						</Link>
					</div>

					<div className="item">
						<BorderColorIcon className="icon" />
						<Link to="/contact" style={{ textDecoration: "none" }}>
							{" "}
							Contact
						</Link>
					</div>

					<div
						className="item item_mobile"
						onClick={() => setCartOpen(true)}
						style={{ cursor: "pointer" }}>
						<ShoppingCartIcon className="icon" />
						<div className="counter">
							{cartItems?.reduce((a, c) => a + c.qty, 0)}
						</div>
					</div>
					<div
						className="item item_mobile"
						onClick={() =>
							userInfo?.favorites.length > 0 && setFavoriteOpen(true)
						}
						style={{ cursor: "pointer" }}>
						<FavoriteBorderIcon className="icon" />
						<div className="counter">{userInfo?.favorites.length}</div>
					</div>

					{userInfo ? (
						<div className="item" onClick={() => setUserOpen(true)}>
							<img src={userInfo?.avatar.url} alt="" className="avatar" />
							<div className="user">{userInfo.name}</div>
							{!userOpen ? (
								<ArrowDownwardIcon style={{ fontSize: "14px" }} />
							) : (
								<ArrowUpwardIcon style={{ fontSize: "14px" }} />
							)}
						</div>
					) : (
						<>
							<Button className="login" onClick={() => setModalShow(true)}>
								Login
							</Button>

							<Auth show={modalShow} onHide={() => setModalShow(false)} />
						</>
					)}
				</div>{" "}
			</div>{" "}
			{cartOpen && (
				<>
					{cartItems.length > 0 ? (
						<div className="cart" ref={miniCart}>
							<div className="cart_top">
								<div>Image</div>
								<div>Details</div>
								<div>Action</div>
							</div>
							<div className="cart_body container">
								{cartItems?.map((item, i) => (
									<div className="cart_single row" key={i}>
										<div className="cart_left  col-sm">
											<img src={item.images} alt="image_user" />
										</div>
										<div className="cart_right col-sm">
											<div className="item" style={{ fontSize: "15px" }}>
												{item.name}
											</div>
											<div className="item">qty : {item.qty}</div>
											<div className="item" style={{ marginTop: "40px" }}>
												price : ${item.price}
											</div>
										</div>
										<div className="delete_item col-1">
											<DeleteIcon onClick={() => removeItem(item.product)} />
										</div>
									</div>
								))}{" "}
							</div>

							<div className="cart_footer">
								<div className="cart_sub">
									Subtotal:{" "}
									<span>
										${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
									</span>
								</div>
								<div className="cart_button">
									<button
										onClick={() => {
											setCartOpen(false);
											navigate("/shipping");
										}}>
										checkout
									</button>
									<button
										onClick={() => {
											setCartOpen(false);
											navigate("/cart");
										}}>
										view and edit cart
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="cart d-flex justify-content-center " ref={miniCart}>
							<h3 className="m-auto ">Empty cart</h3>
						</div>
					)}
				</>
			)}
			{userOpen && (
				<div className="drop_user" ref={dropUser}>
					<Link
						to="/me"
						className="item"
						style={{ textDecoration: "none" }}
						onClick={() => setUserOpen(false)}>
						Profile
					</Link>
					{userInfo?.role === "admin" && (
						<>
							<Link
								to="/admin"
								className="item"
								style={{ textDecoration: "none" }}
								onClick={() => setUserOpen(false)}>
								Dashboard
							</Link>
							<Link
								to="/admin/products"
								className="item"
								onClick={() => setUserOpen(false)}
								style={{ textDecoration: "none" }}>
								Products
							</Link>
							<Link
								to="/admin/users"
								className="item"
								onClick={() => setUserOpen(false)}
								style={{ textDecoration: "none" }}>
								Users
							</Link>
							<Link
								to="/admin/orders"
								className="item"
								onClick={() => setUserOpen(false)}
								style={{ textDecoration: "none" }}>
								Orders
							</Link>
							<Link
								to="/admin/reviews"
								className="item"
								onClick={() => setUserOpen(false)}
								style={{ textDecoration: "none" }}>
								Reviews
							</Link>
						</>
					)}
					{userInfo?.role === "seller" && (
						<Link
							to="/seller"
							className="item"
							style={{ textDecoration: "none" }}
							onClick={() => {
								setUserOpen(false);
							}}>
							Seller
						</Link>
					)}
					<Link
						to="/"
						className="item"
						style={{ textDecoration: "none" }}
						onClick={() => {
							signoutHandler();
							setUserOpen(false);
						}}>
						Logout
					</Link>
				</div>
			)}
			{favoriteOpen && (
				<div
					ref={dropFavorite}
					className={`favorite_cart ${
						userInfo?.favorites.length > 3 && "scroll"
					}`}>
					{userInfo?.favorites.map((item) => (
						<div className="fav_cart">
							<div className="left">
								<img src={item.image} />
							</div>
							<div className="center">
								<div>{item.name}</div>
								<div>price : ${item.price}</div>
							</div>
							<div className="right">
								{" "}
								<div>
									{item.stock > 0 ? (
										<span className="text-success font-weight-bold">
											inStock
										</span>
									) : (
										<span className="text-danger font-weight-bold">
											outStock
										</span>
									)}
								</div>
								<div>
									<div className="delete_favorite ">
										<DeleteIcon
											onClick={() => deleteFavoriteId(item.product)}
										/>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="list_navbar">
				{Lists.map((list, index) => (
					<Link
						key={index}
						to={`search/category/${list.title}`}
						style={{ textDecoration: "none" }}>
						<span>
							{list.icon} <span>{list.title}</span>{" "}
						</span>{" "}
					</Link>
				))}
			</div>
		</div>
	);
}
