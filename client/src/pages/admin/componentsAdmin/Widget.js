import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allUsersAdmin } from "../../../actions/userActions";
import { allOrdersAdmin } from "../../../actions/orderActions";
import Loading from "../../../components/loading/Loading";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
	let data;
	const allUsers = useSelector((state) => state.allUsers);
	const { users, loading } = allUsers;
	const allOrders = useSelector((state) => state.allOrders);
	const { orders } = allOrders;

	switch (type) {
		case "user":
			data = {
				title: "USERS",
				isMoney: false,
				amount: users?.length,
				link: "See all users",
				to: "/admin/users",
				icon: (
					<PersonOutlinedIcon
						className="icon"
						style={{
							color: "crimson",
							backgroundColor: "rgba(255, 0, 0, 0.2)",
						}}
					/>
				),
			};
			break;
		case "order":
			data = {
				title: "ORDERS",
				isMoney: false,
				amount: orders?.orders.length,
				link: "View all orders",
				to: "/admin/orders",

				icon: (
					<ShoppingCartOutlinedIcon
						className="icon"
						style={{
							backgroundColor: "rgba(218, 165, 32, 0.2)",
							color: "goldenrod",
						}}
					/>
				),
			};
			break;
		case "earning":
			data = {
				title: "EARNINGS",
				isMoney: true,
				amount: orders?.totalAmount,
				link: "View net earnings",
				to: "/admin/orders",
				icon: (
					<MonetizationOnOutlinedIcon
						className="icon"
						style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
					/>
				),
			};
			break;

		default:
			break;
	}

	return (
		<div className="widget">
			{loading ? (
				<Loading />
			) : (
				<>
					<div className="left">
						<span className="title">{data.title}</span>
						<span className="counter ">
							{data.isMoney && "$"} {data.amount?.toFixed(2)}
						</span>
						<Link to={data.to} style={{ textDecoration: "none" }}>
							<span className="link">{data.link}</span>
						</Link>
					</div>
					<div className="right">{data.icon}</div>
				</>
			)}
		</div>
	);
};

export default Widget;
