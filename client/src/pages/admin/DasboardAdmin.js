import React, { useEffect } from "react";
import Widget from "./componentsAdmin/Widget";
import "./admin.scss";
import { useDispatch } from "react-redux";
import { allOrdersAdmin } from "../../actions/orderActions";
import { allUsersAdmin } from "../../actions/userActions";

export default function DasboardAdmin() {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(allOrdersAdmin());
    dispatch(allUsersAdmin());
  }, [dispatch]);

  return (
    <div className="home">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
       
      
    </div>
  );
}
