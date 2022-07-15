import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import Lists from "./list";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { signout } from "../../actions/userActions";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";

export default function Sidebar() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const [openCategory, setOpenCategory] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(true);
	const dispatch = useDispatch();

	const signoutHandler = () => {
		dispatch(signout());
		navigate("/");
	};

	return (
		<div>
			<div className="sidebar">
				{userInfo && (
					<div className="top">
						<span>
							Hi <b>{userInfo?.name}</b>{" "}
						</span>
					</div>
				)}
				<hr />
				<div className="center">
					<ul>
						<p className="title">MAIN</p>
						<li>
							<HomeIcon className="icon" />
							<Link to="/" style={{ textDecoration: "none" }}>
								<span>Home</span>
							</Link>
						</li>

						<li>
							<div className="counter">
								{cartItems.reduce((a, c) => a + c.qty, 0)}
							</div>
							<ShoppingCartIcon className="icon" />
							<Link to="/cart" style={{ textDecoration: "none" }}>
								<span>Cart</span>{" "}
							</Link>
						</li>

						<li>
							<PersonIcon className="icon" />{" "}
							<Link to="/me" style={{ textDecoration: "none" }}>
								<span>Profile</span>{" "}
							</Link>
						</li>
						<div className="category">
							<p className="title">Category</p>
							{!openCategory ? (
								<ArrowDownwardIcon
									className="icon"
									onClick={() => setOpenCategory(!openCategory)}
								/>
							) : (
								<ArrowUpwardIcon
									className="icon"
									onClick={() => setOpenCategory(!openCategory)}
								/>
							)}
						</div>

						{openCategory && (
							<>
								{Lists.map((list, index) => (
									<li key={index}>
										{list.icon}{" "}
										<Link
											to={`search/category/${list.title}`}
											style={{ textDecoration: "none" }}>
											<span>{list.title}</span>{" "}
										</Link>
									</li>
								))}
							</>
						)}
						{userInfo && userInfo.role === "admin" && (
							<>
								<p className="title">Admin</p>
								<li>
									<DashboardIcon className="icon" />
									<Link to="/admin" style={{ textDecoration: "none" }}>
										<span>Dashboard</span>{" "}
									</Link>
								</li>
								<li>
									<CategoryIcon className="icon" />
									<Link to="/admin/products" style={{ textDecoration: "none" }}>
										<span>Products</span>{" "}
									</Link>
								</li>

								<li>
									<GroupIcon className="icon" />{" "}
									<Link to="/admin/users" style={{ textDecoration: "none" }}>
										<span>Users</span>{" "}
									</Link>
								</li>

								<li>
									<BookmarkBorderIcon className="icon" />
									<Link to="/admin/orders" style={{ textDecoration: "none" }}>
										<span>Orders</span>{" "}
									</Link>
								</li>
								<li>
									<ReviewsIcon className="icon" />
									<Link to="/admin/reviews" style={{ textDecoration: "none" }}>
										<span>Reviews</span>{" "}
									</Link>
								</li>
							</>
						)}
						{userInfo && userInfo.role === "seller" && (
							<>
								<p className="title">Seller</p>

								<li>
									<CategoryIcon className="icon" />
									<Link to="/seller" style={{ textDecoration: "none" }}>
										<span>Products</span>{" "}
									</Link>
								</li>
							</>
						)}

						<hr />
						{userInfo && (
							<li>
								<ExitToAppIcon className="icon" />
								<span onClick={() => signoutHandler()}>Logout</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
