import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listProducts } from "../../../actions/productActions";
import Loading from "../../../components/loading/Loading";
import { productColumns } from "../datatablesource";
import {
	NEW_PRODUCT_RESET,
	UPDATE_PRODUCT_RESET,
} from "../../../constants/productConstants";
import MessageBox from "../../../components/MessageBox";
import Title from "../../../components/Title";

export default function ProductAdmin() {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const productDeleteAdmin = useSelector((state) => state.productDeleteAdmin);
	const { isDeleted } = productDeleteAdmin;

	useEffect(() => {
		dispatch(listProducts({}));
		dispatch({ type: UPDATE_PRODUCT_RESET });
		dispatch({ type: NEW_PRODUCT_RESET });
	}, [dispatch]);

	// delete product
	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			dispatch(deleteProduct(id));
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
							to={`/admin/products/${params.row._id}`}
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
			<Title title={"admin products"} />

			<div className="listContainer">
				{loading ? (
					<Loading />
				) : (
					<div className="datatable">
						{isDeleted && (
							<MessageBox variant="success">The Product Delete</MessageBox>
						)}
						{error && <MessageBox variant="danger">{error}</MessageBox>}

						<div className="datatableTitle">
							Products{" "}
							<Link to="/admin/products/new" className="link">
								Add New Product
							</Link>
						</div>

						<DataGrid
							className="datagrid"
							rows={products}
							getRowId={(row) => row._id}
							columns={productColumns.concat(actionColumn)}
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
