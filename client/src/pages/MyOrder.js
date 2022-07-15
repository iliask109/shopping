import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";

export default function MyOrder() {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <div>
      <div className="container py-5 h-100 my_order_page">
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-7">
              <div
                className="card   border-3"
                style={{ borderColor: "#f37a27" }}
              >
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{order?.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className="col mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>{order._id}</p>
                    </div>
                  </div>

                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    {order.orderItems.map((item) => (
                      <div className="row" key={item.name}>
                        <div className="col-md-8 col-lg-8">
                          <p>{item.name}</p>
                        </div>
                        <div className="col-md-4 col-lg-2">
                          <p>{item.qty}</p>
                        </div>
                        <div className="col-md-4 col-lg-2">
                          <p>${item.qty * item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row my-4">
                    <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                      Tax : ${order.taxPrice}
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                      <p
                        className="lead fw-bold mb-0"
                        style={{ color: "#f37a27" }}
                      >
                        ${order.totalPrice}
                      </p>
                    </div>
                  </div>

                  <p
                    className="lead fw-bold mb-4 pb-2"
                    style={{ color: "#f37a27" }}
                  >
                    Tracking Order :
                  </p>

                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="list-inline items d-flex justify-content-between">
                        <li className="list-inline-item items-list">
                          <p
                            className="py-1 px-2 rounded text-white"
                            style={{ backgroundColor: "#f37a27" }}
                          >
                            {order.orderStatus}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="mt-4 pt-2 mb-0">
                    Want any help?
                    <Link to="/contact" style={{ color: "#f37a27" }}>
                      Please contact us
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
