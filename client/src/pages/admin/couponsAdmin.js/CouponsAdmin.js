import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { couponsColumns } from "../datatablesource";
import Loading from "../../../components/loading/Loading";
import MessageBox from "../../../components/MessageBox";
import Title from "../../../components/Title";
import {
	deleteCouponAdmin,
	getAllCouponsAdmin,
} from "../../../actions/couponsAction";

export default function CouponsAdmin() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCouponsAdmin());
	}, [dispatch]);

	const getCoupons = useSelector((state) => state.getCoupons);
	const { coupons, loading } = getCoupons;
	const deleteCoupon = useSelector((state) => state.deleteCoupon);
	const { isDeleted } = deleteCoupon;

	// // delete coupon
	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this coupon?")) {
			dispatch(deleteCouponAdmin(id));
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
						<div
							className="deleteButton"
							onClick={() => handleDelete(params.row._id)}>
							Delete
						</div>
					</div>
				);
			},
		},
	];
	return (
		<div className="listAdmin">
			<Title title={"admin coupons"} />

			<div className="listContainer">
				{loading ? (
					<Loading />
				) : (
					<div className="datatable">
						{isDeleted && (
							<MessageBox variant="success">The Coupon Delete</MessageBox>
						)}

						<div className="datatableTitle">
							Coupons{" "}
							<Link to="/admin/coupon/new" className="link">
								Add New Coupon
							</Link>
						</div>
						<DataGrid
							className="datagrid"
							rows={coupons}
							getRowId={(row) => row._id}
							columns={couponsColumns.concat(actionColumn)}
							pageSize={10}
							rowsPerPageOptions={[10]}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
