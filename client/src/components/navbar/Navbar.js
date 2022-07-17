import React, { useState } from "react";
import { SiShopware } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import Auth from "../auth/Auth";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function Navbar() {
	const [modalShow, setModalShow] = useState(false);
	const [name, setName] = useState("");
	const navigate = useNavigate();

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

	return (
		<div className="navbar col-lg-12">
			<div className="wrapper ">
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

					<div className="item">
						<Link to="/cart">
							<ShoppingCartIcon className="icon" />
							<div className="counter">
								{cartItems.reduce((a, c) => a + c.qty, 0)}
							</div>
						</Link>
					</div>

					{userInfo ? (
						<div className="item">
							<img src={userInfo.avatar} alt="" className="avatar" />
							<div className="user">{userInfo.name}</div>
						</div>
					) : (
						<>
							<Button className="login" onClick={() => setModalShow(true)}>
								Login
							</Button>

							<Auth show={modalShow} onHide={() => setModalShow(false)} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
