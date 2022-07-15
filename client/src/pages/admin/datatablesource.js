import Rating from "../../components/rating/Rating";

export const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 230,
    renderCell: (params) => {
      return <b>{params.row._id}</b>;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "UpdatedAt",
    renderCell: (params) => {
      return <div>{params.row.updatedAt.slice(0, 10)}</div>;
    },
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
];

export const productColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 230,
    renderCell: (params) => {
      return <b>{params.row._id}</b>;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    renderCell: (params) => {
      return <div>${params.row.price}</div>;
    },
    width: 100,
  },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt={"imageProdct"} />
        </div>
      );
    },
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "seller",
    headerName: "Seller",
    width: 100,
  },
  {
    field: "stock",
    headerName: "Stock",
    renderCell: (params) => {
      return (
        <span
          className={`status ${params.row.stock > 0 ? "inStock" : "outStock"}`}
        >
          {params.row.stock}
        </span>
      );
    },
    width: 70,
  },
];

export const orderColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 230,
    renderCell: (params) => {
      return <b>{params.row._id}</b>;
    },
  },
  {
    field: "paidAt",
    headerName: "Paid At",
    renderCell: (params) => {
      return <div>{params.row.paidAt.slice(0, 10)}</div>;
    },
    width: 100,
  },
  {
    field: "itemsPrice",
    headerName: "Items",
    renderCell: (params) => {
      return <div>${params.row.itemsPrice}</div>;
    },
    width: 100,
  },
  {
    field: "taxPrice",
    headerName: "Tax Price",
    renderCell: (params) => {
      return <div>${params.row.taxPrice}</div>;
    },
    width: 100,
  },
  {
    field: "shippingPrice",
    headerName: "Shipping",
    renderCell: (params) => {
      return <div>${params.row.shippingPrice}</div>;
    },
    width: 110,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    renderCell: (params) => {
      return <div>${params.row.totalPrice}</div>;
    },
    width: 100,
  },
  {
    field: "orderStatus",
    headerName: "Status",
    renderCell: (params) => {
      return (
        <span
          className={`status ${
            params.row.orderStatus === "Delivered" ? "inStock" : "outStock"
          }`}
        >
          {params.row.orderStatus}
        </span>
      );
    },
    width: 100,
  },
];

export const reviewsColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 230,
    renderCell: (params) => {
      return <b>{params.row._id}</b>;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "ratings",
    headerName: "Rating",
    renderCell: (params) => {
      return <Rating rating={params.row.ratings} caption={" &"}></Rating>;
    },
    width: 150,
  },

  {
    field: "numOfReviews",
    headerName: "Reviews",
    renderCell: (params) => {
      return (
        <span
          className={`status ${
            params.row.numOfReviews > 0 ? "inStock" : "outStock"
          }`}
        >
          {params.row.numOfReviews}
        </span>
      );
    },
    width: 150,
  },
];
