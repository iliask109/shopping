import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listProducts } from "../../actions/productActions";
import Loading from "../../components/loading/Loading";
import { productColumns, reviewsColumns } from "./datatablesource";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ReviewsAdmin() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDeleteAdmin = useSelector((state) => state.productDeleteAdmin);
  const { success } = productDeleteAdmin;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          params.row.reviews.length > 0 && (
            <div className="cellAction">
              <Link
                to={`/admin/reviews/${params.row._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
            </div>
          )
        );
      },
    },
  ];

  return (
    <div className="listAdmin">
      <Link to="/admin">
              <ArrowBackIcon />
            </Link>
      <div className="listContainer">
        {loading ? (
          <Loading />
        ) : (
          <div className="datatable">
            <div className="datatableTitle">Reviews </div>

            <DataGrid
              className="datagrid"
              rows={products}
              getRowId={(row) => row._id}
              columns={reviewsColumns.concat(actionColumn)}
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
