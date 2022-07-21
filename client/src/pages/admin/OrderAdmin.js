import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { allOrdersAdmin, deleteOrderAdmin } from "../../actions/orderActions";
import Loading from "../../components/loading/Loading";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { orderColumns, productColumns } from "./datatablesource";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MessageBox from "../../components/MessageBox";

export default function OrderAdmin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const allOrders = useSelector((state) => state.allOrders);
	const { orders, loading } = allOrders;

	const deleteOrder = useSelector((state) => state.deleteOrder);
	const { isDeleted } = deleteOrder;

	useEffect(() => {
		dispatch(allOrdersAdmin());
		dispatch({ type: UPDATE_ORDER_RESET });
	}, [dispatch]);

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			dispatch(deleteOrderAdmin(id));
		}
	};
	if (isDeleted) {
		setTimeout(window.location.reload(), 1500);
	}
	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link
							to={`/admin/orders/${params.row._id}`}
							style={{ textDecoration: "none" }}>
							<div className="viewButton">Edit</div>
						</Link>
						{params.row.role === "admin" || (
							<div
								className="deleteButton"
								onClick={() => handleDelete(params.row._id)}>
								Delete
							</div>
						)}
					</div>
				);
			},
		},
	];

	return (
		<div className="listAdmin">
			<div className="listContainer">
				{loading ? (
					<Loading />
				) : (
					<div className="datatable">
						{isDeleted && (
							<MessageBox variant="success">The Order Delete</MessageBox>
						)}
						<button className="goBack" onClick={() => navigate(-1)}>
							<ArrowBackIcon className="icon" />
						</button>
						<div className="datatableTitle">Orders </div>

						<DataGrid
							className="datagrid"
							rows={orders.orders}
							getRowId={(row) => row._id}
							columns={orderColumns.concat(actionColumn)}
							pageSize={10}
							rowsPerPageOptions={[10]}
							checkboxSelection
						/>
					</div>
				)}
			</div>
		</div>
	);
}
