import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allUsersAdmin, deleteUser } from "../../actions/userActions";
import { userColumns } from "./datatablesource";
import Loading from "../../components/loading/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UserAdmin() {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.allUsers);
  const { users, loading } = allUsers;
  const userDeleteAdmin = useSelector((state) => state.userDeleteAdmin);
  const { success } = userDeleteAdmin;

  useEffect(() => {
    dispatch(allUsersAdmin());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
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
              to={`/admin/users/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            {params.row.role === "admin" || (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
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
      <Link to="/admin">
              <ArrowBackIcon />
            </Link>
      <div className="listContainer">
        {loading ? (
          <Loading />
        ) : (
          <div className="datatable">
            <div className="datatableTitle">Users</div>
            <DataGrid
              className="datagrid"
              rows={users}
              getRowId={(row) => row._id}
              columns={userColumns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
