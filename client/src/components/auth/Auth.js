import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signin } from "../../actions/userActions";
import MessageBox from "../MessageBox";
import Loading from "../loading/Loading";

import "./auth.scss";
export default function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const userSignin = useSelector((state) => state.userSignin);
  const {
    userInfo: userInfoSignin,
    loading: loadingSignin,
    error: errorSignin,
  } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (isLogin) {
      dispatch(signin(email, password));
    } else {
      if (password !== confirmPassword) {
        alert("Password and confirm password are not match");
      } else {
        dispatch(register(fullName, email, password));
      }
    }
  };

  useEffect(() => {
    if (userInfo || userInfoSignin) {
      setIsLogin(true);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      props.onHide();
    }
  }, [userInfo, userInfoSignin, props]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {isLogin ? "Login" : "Register"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading || loadingSignin ? (
          <Loading></Loading>
        ) : (
          <div className="container">
            <div className="row">
              {isLogin ? (
                <h1>
                  <i className="fa fa-lock"></i> Login
                </h1>
              ) : (
                <h1>
                  <i className="fa-solid fa-address-card"></i> Register
                </h1>
              )}
            </div>
            <br />
            <br />
            {!isLogin && (
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user icon"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa-solid fa-at"></i>{" "}
                </span>
              </div>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-key icon"></i>
                </span>
              </div>
              <input
                type="Password"
                name="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  type="Password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <button
              type="button"
              className="btn btn-success"
              onClick={() => submitHandler()}
            >
              <span className="glyphicon glyphicon-off"></span>{" "}
              {isLogin ? "Login" : "Register"}
            </button>
            <hr />

            <div className="footer">
              {error || errorSignin ? (
                <MessageBox variant="danger">{error || errorSignin}</MessageBox>
              ) : (
                ""
              )}

              {isLogin ? (
                <>
                  <p>
                    Don't have an Account!{" "}
                    <Link to="#" onClick={() => setIsLogin(false)}>
                      Sign Up Here
                    </Link>
                  </p>

                  <p>
                    Forgot <Link to="#">Password</Link>
                  </p>
                </>
              ) : (
                <p>
                  If you have an Account?
                  <Link to="#" onClick={() => setIsLogin(true)}>
                    Login Here
                  </Link>
                </p>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
