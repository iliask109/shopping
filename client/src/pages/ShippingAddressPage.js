import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingAddressPage() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    alert("Please Login or Register");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        phone,
      })
    );
    navigate("/payment");
  };

  return (
		<div>
			<div className="shipping_page container">
				<CheckoutSteps step1 step2></CheckoutSteps>
				{userInfo && (
					<form className="" onSubmit={submitHandler}>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fa fa-user"></i>
								</span>
							</div>
							<input
								type="text"
								id="fullName"
								className="form-control"
								placeholder="Enter full name"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								required
							/>
						</div>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fa fa-address-card"></i>
								</span>
							</div>
							<input
								className="form-control"
								type="text"
								id="address"
								placeholder="Enter address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									{" "}
									<i className="fa fa-phone"></i>{" "}
								</span>
							</div>
							<select className="custom-select" style={{ maxWidth: "120px" }}>
								<option defaultValue="+972">+972</option>
							</select>
							<input
								type="number"
								id="phone"
								placeholder="Enter Phone Number"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
								className="form-control"
							/>
						</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fa fa-lock"></i>
								</span>
							</div>
							<input
								className="form-control"
								type="text"
								id="postalCode"
								placeholder="Enter postal code"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								required
							/>
						</div>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fa-solid fa-city"></i>{" "}
								</span>
							</div>
							<input
								type="text"
								id="city"
								placeholder="Enter city"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
								className="form-control"
							/>
						</div>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fa-solid fa-flag"></i>{" "}
								</span>
							</div>
							<input
								type="text"
								className="form-control"
								id="country"
								placeholder="Enter country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								required
							/>
						</div>
						<div className="form-group btn-block">
							<button
								className="btn btn-success m-2"
								type="button"
								onClick={() => {
									dispatch(
										saveShippingAddress({
											fullName,
											address,
											city,
											postalCode,
											country,
											phone,
										})
									);
								}}>
								save
							</button>
							<button type="submit" className="btn btn-primary m-2">
								Continue to pay
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
