import React, { useEffect, useRef, useState } from "react";
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

import useClickOutside from "../../helpers/clickOutside";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { removeFromCart } from "../../actions/cartActions";

import Lists from "../sidebar/list";
import { signout } from "../../actions/userActions";

export default function Navbar() {
	const [modalShow, setModalShow] = useState(false);
	const [name, setName] = useState("");
	const [cartOpen, setCartOpen] = useState(false);
	const [userOpen, setUserOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const handleSearch = () => {
		if (name) {
			navigate(`/search/name/${name}`);
			setName("");
		}
	};

	const Mobile = useMediaQuery({ query: "(max-width: 700px)" });

	const miniCart = useRef(null);
	const dropUser = useRef(null);

	useClickOutside(miniCart, () => {
		setCartOpen(false);
	});
	useClickOutside(dropUser, () => {
		setUserOpen(false);
	});

	const removeItem = (id) => {
		dispatch(removeFromCart(id));
	};

	const signoutHandler = () => {
		dispatch(signout());
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
						type="text"
						required
						placeholder="Search..."
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<SearchOutlinedIcon
						style={{ cursor: "pointer" }}
						onClick={() => handleSearch()}
					/>
				</div>
				<div className="items">
					<div className="item">
						<BorderColorIcon className="icon" />
						<Link to="/contact" style={{ textDecoration: "none" }}>
							{" "}
							Contact
						</Link>
					</div>

					<div
						className="item"
						onClick={() => setCartOpen(true)}
						style={{ cursor: "pointer" }}>
						{/* <Link to="/cart"> */}
						<ShoppingCartIcon className="icon" />
						<div className="counter">
							{cartItems?.reduce((a, c) => a + c.qty, 0)}
						</div>
						{/* </Link> */}
					</div>

					{userInfo ? (
						<div className="item" onClick={() => setUserOpen(true)}>
							<img src={userInfo.avatar} alt="" className="avatar" />
							<div className="user">{userInfo.name}</div>
							<ArrowDownwardIcon style={{ fontSize: "14px" }} />
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
					<div className="cart" ref={miniCart}>
						<div className="cart_body container">
							{cartItems?.map((item) => (
								<div className="cart_single row">
									<div className="cart_left col-sm">
										<img src={item.image} />
									</div>
									<div className="cart_right col-sm">
										<div className="item" style={{ fontSize: "15px" }}>
											{item.name}
										</div>
										<div className="item">qty : {item.qty}</div>
										<div className="item" style={{ marginTop: "40px" }}>
											${item.price}
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
