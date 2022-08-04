import React, { useEffect } from "react";
import Widget from "./componentsAdmin/Widget";
import "./admin.scss";
import { useDispatch, useSelector } from "react-redux";
import { allOrdersAdmin } from "../../actions/orderActions";
import { allUsersAdmin } from "../../actions/userActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { allMessagesAdmin } from "../../actions/messageActions";
import { messageColumns } from "./datatablesource";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../../components/loading/Loading";

export default function DasboardAdmin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(allMessagesAdmin());
		dispatch(allOrdersAdmin());
		dispatch(allUsersAdmin());
	}, [dispatch]);

	const allMessages = useSelector((state) => state.allMessages);
	const { messages, loading } = allMessages;

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link
							to={`/admin/message/${params.row._id}`}
							style={{ textDecoration: "none" }}>
							<div className="viewButton">View</div>
						</Link>
					</div>
				);
			},
		},
	];

	return (
		<div className="home">
			<Title title={"Admin"} />
{/* 
			<div className="widgets">
			
				<Widget type="user" />
				<Widget type="order" />
				<Widget type="earning" />
			</div> */}
			{loading ? (
				<Loading />
			) : (
				<div className="datatable">
					<div className="datatableTitle">Messages </div>

					<DataGrid
						className="datagrid"
						rows={messages}
						getRowId={(row) => row._id}
						columns={messageColumns.concat(actionColumn)}
						pageSize={10}
						rowsPerPageOptions={[10]}
						checkboxSelection
					/>
				</div>
			)}
		</div>
	);
}
