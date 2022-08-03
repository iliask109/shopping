import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import Lists from "./list";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { signout } from "../../actions/userActions";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
	CLOSE_SIDEBAR,
	OPEN_SIDEBAR,
	OPEN_SIDEBAR_MOBILE,
} from "../../constants/cartConstants";
import useClickOutside from "../../helpers/clickOutside";

export default function Sidebar() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const navigate = useNavigate();
	const sidebarReducer = useSelector((state) => state.sidebarReducer);
	const { sidebar } = sidebarReducer;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const [openCategory, setOpenCategory] = useState(true);

	const dispatch = useDispatch();

	const Mobile = useMediaQuery({ query: "(max-width: 700px)" });

	useEffect(() => {
		if (Mobile) {
			dispatch({ type: CLOSE_SIDEBAR });
		} 
	}, [Mobile, dispatch]);

	const signoutHandler = () => {
		dispatch(signout());
		navigate("/");
	};

	const sidebarRef = useRef(null);

	useClickOutside(sidebarRef, () => {
		dispatch({ type: CLOSE_SIDEBAR });
	});

	document.addEventListener("click", function (e) {
		if (e.target.localName === "li") {
			dispatch({ type: CLOSE_SIDEBAR });
		} else if (e.target.localName === "span") {
			dispatch({ type: CLOSE_SIDEBAR });
		}
	});

	return (
		<div>
			{!sidebar ? (
				<i
					className="fas fa-bars"
					onClick={() => dispatch({ type: OPEN_SIDEBAR_MOBILE })}></i>
			) : (
				<div className="sidebar mobile" ref={sidebarRef}>
					<button
						type="button"
						className="btn-close"
						onClick={() => dispatch({ type: CLOSE_SIDEBAR })}>
						<span className="icon-cross"></span>
					</button>
					{userInfo && (
						<div className="top">
							<span>
								Hi <b>{userInfo?.name}</b>
							</span>
						</div>
					)}
					<hr />
					<div className="center">
						<ul>
							<p className="title">MAIN</p>
							<Link to="/" style={{ textDecoration: "none" }}>
								<li>
									<HomeIcon className="icon" />
									<span>Home</span>
								</li>{" "}
							</Link>
							<Link to="/sales" style={{ textDecoration: "none" }}>
								<li>
									<LoyaltyIcon className="icon" />
									<span>Sales</span>
								</li>
							</Link>
							<Link to="/cart" style={{ textDecoration: "none" }}>
								<li>
									<div className="counter">
										{cartItems.reduce((a, c) => a + c.qty, 0)}
									</div>
									<ShoppingCartIcon className="icon" />
									<span>Cart</span>{" "}
								</li>
							</Link>

							{userInfo && (
								<Link to="/me" style={{ textDecoration: "none" }}>
									<li>
										<PersonIcon className="icon" /> <span>Profile</span>{" "}
									</li>
								</Link>
							)}
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
										<Link
											key={index}
											to={`search/category/${list.title}`}
											style={{ textDecoration: "none" }}>
											<li>
												{list.icon} <span>{list.title}</span>{" "}
											</li>{" "}
										</Link>
									))}
								</>
							)}
							{userInfo && userInfo.role === "admin" && (
								<>
									<p className="title">Admin</p>{" "}
									<Link to="/admin" style={{ textDecoration: "none" }}>
										<li>
											<DashboardIcon className="icon" />
											<span>Dashboard</span>{" "}
										</li>{" "}
									</Link>
									<Link to="/admin/products" style={{ textDecoration: "none" }}>
										<li>
											<CategoryIcon className="icon" />
											<span>Products</span>{" "}
										</li>{" "}
									</Link>
									<Link to="/admin/users" style={{ textDecoration: "none" }}>
										<li>
											<GroupIcon className="icon" /> <span>Users</span>{" "}
										</li>{" "}
									</Link>
									<Link to="/admin/orders" style={{ textDecoration: "none" }}>
										<li>
											<BookmarkBorderIcon className="icon" />
											<span>Orders</span>{" "}
										</li>{" "}
									</Link>
									<Link to="/admin/reviews" style={{ textDecoration: "none" }}>
										<li>
											<ReviewsIcon className="icon" />
											<span>Reviews</span>{" "}
										</li>{" "}
									</Link>
								</>
							)}
							{userInfo && userInfo.role === "seller" && (
								<>
									<p className="title">Seller</p>

									<Link to="/seller" style={{ textDecoration: "none" }}>
										<li>
											<CategoryIcon className="icon" />
											<span>Products</span>{" "}
										</li>{" "}
									</Link>
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
			)}
		</div>
	);
}
