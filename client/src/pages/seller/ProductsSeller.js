import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProductsSeller,
  listProducts,
} from "../../actions/productActions";
import Loading from "../../components/loading/Loading";
import { productColumns } from "../admin/datatablesource";

export default function ProductsSeller() {
  const dispatch = useDispatch();

  const productSellerList = useSelector((state) => state.productSellerList);
  const { loading, products } = productSellerList;

  const productDeleteAdmin = useSelector((state) => state.productDeleteAdmin);
  const { success } = productDeleteAdmin;

  useEffect(() => {
    dispatch(getProductsSeller());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteProduct(id));
    }
    if (success) window.location.reload();
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/seller/product/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            {
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            }
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
