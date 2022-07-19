import React, { useEffect } from "react";
import Widget from "./componentsAdmin/Widget";
import "./admin.scss";
import { useDispatch } from "react-redux";
import { allOrdersAdmin } from "../../actions/orderActions";
import { allUsersAdmin } from "../../actions/userActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function DasboardAdmin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(allOrdersAdmin());
		dispatch(allUsersAdmin());
	}, [dispatch]);

	return (
		<div className="home">
			<div className="widgets">
				<button className="goBack" onClick={() => navigate(-1)}>
					<ArrowBackIcon className="icon" />
				</button>
				<Widget type="user" />
				<Widget type="order" />
				<Widget type="earning" />
			</div>
		</div>
	);
}
