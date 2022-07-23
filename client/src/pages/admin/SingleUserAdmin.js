import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	getUserDetailsAdmin,
	updateUserAdmin,
} from "../../actions/userActions";
import Loading from "../../components/loading/Loading";
import MessageBox from "../../components/MessageBox";
import { Form } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "../../components/Title";

export default function SingleUserAdmin() {
	const userDetails = useSelector((state) => state.userDetailsAdmin);
	const { loading, error, user } = userDetails;
	const userUpdate = useSelector((state) => state.userUpdateAdmin);
	const { isUpdate, loading: loadingUpdate } = userUpdate;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	useEffect(() => {
		if (!user || user._id !== id) {
			dispatch(getUserDetailsAdmin(id));
		} else {
			setName(user?.name);
			setEmail(user?.email);
			setRole(user?.role);
		}
	}, [dispatch, id, loading, user]);

	const submitHandler = () => {
		dispatch(updateUserAdmin(id, { name, email, role }));
	};

	return (
		<div>
			<Title title={"admin users"} />

			<button className="goBack" onClick={() => navigate(-1)}>
				<ArrowBackIcon className="icon" />
			</button>
			<div className="container rounded bg-white mt-5 mb-5">
				{loading ? (
					<Loading></Loading>
				) : (
					<div className="row">
						{error && <MessageBox variant="danger">{error}</MessageBox>}
						<div className="col-md-3 "></div>
						<div className="col-md-5 ">
							{isUpdate && (
								<MessageBox variant="success">
									The update was successful
								</MessageBox>
							)}
							{loadingUpdate ? (
								<Loading></Loading>
							) : (
								<div className="p-3 py-5">
									<div className="d-flex justify-content-between align-items-center mb-3">
										<h4 className="text-right">Profile Settings</h4>
									</div>

									<div className="row mt-3">
										<div className="col-md-12">
											<label className="labels">Name</label>
											<input
												type="text"
												className="form-control"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="col-md-12">
											<label className="labels">Email</label>
											<input
												type="text"
												className="form-control"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>

										<div className="col-md-12">
											<label className="labels">Role</label>

											<Form.Select
												className="form-control "
												onChange={(e) => setRole(e.target.value)}
												value={role}>
												{user?.role === "admin" || (
													<>
														{" "}
														<option
															value="user"
															disabled={user?.role === "user"}>
															user
														</option>
														<option
															value="seller"
															disabled={user?.role === "seller"}>
															seller
														</option>
													</>
												)}
												<option value="admin">admin</option>
											</Form.Select>
										</div>
									</div>

									<div className="mt-5 text-center">
										<button
											className="btn btn-primary profile-button"
											type="button"
											onClick={() => submitHandler()}>
											Update
										</button>
									</div>
								</div>
							)}
						</div>
						<div className="col-md-4"></div>
					</div>
				)}
			</div>
		</div>
	);
}
