import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerRoute = ({ children }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo.role === "seller" ? children : <Navigate to="/error" />;
};

export default SellerRoute;
