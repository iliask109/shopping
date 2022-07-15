import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	clearErrors,
	updateUserPassword,
	updateUserProfile,
} from "../actions/userActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PASSWORD_RESET } from "../constants/userConstants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditProfilePage() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [changePassword, setChangePassword] = useState(
		pathname === "/me/updatePassowrd" ? true : false
	);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
	const { loading: loadingPassword, error: errorPassword } = userUpdatePassword;
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		success: successUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = userUpdateProfile;
	const dispatch = useDispatch();

	const [name, setName] = useState(user?.user.name || "");
	const [email, setEmail] = useState(user?.user.email || "");
	const [avatar, setAvatar] = useState(user?.user.avatar || "");
	const [role, setRole] = useState(user?.user.role || "");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const submitHandler = () => {
		if (changePassword) {
			if (newPassword === confirmPassword) {
				dispatch(updateUserPassword({ oldPassword, newPassword }));
				if ("successPassword") {
					setOldPassword("");
					setNewPassword("");
					setConfirmPassword("");
					dispatch({ type: USER_UPDATE_PASSWORD_RESET });
					navigate("/me");
				}
			} else {
				alert(error);
			}
		} else {
			dispatch(
				updateUserProfile({
					name,
					email,
					avatar,
				})
			);
			if (successUpdate) {
				navigate("/me");
			}
		}
	};

	if (error) {
		dispatch(clearErrors());
		navigate("/me");
	}

	return (
		<div>
			<div className="container edit_profile_page rounded bg-white mt-5 mb-5">
				<Link to="/me">
					<ArrowBackIcon />
				</Link>

				{loading ? (
					<Loading></Loading>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<div className="row">
						<div className="col-md-3 border-right ">
							{!changePassword && (
								<img
									src={avatar}
									alt="avatar"
									width={"200px"}
									height={"50%"}
									style={{ borderRadius: "50%" }}
									className=" mt-5 mb-5"
								/>
							)}
						</div>
						<div className="col-md-5 border-right">
							<div className="p-3 py-5">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4 className="text-right">
										{changePassword ? "Password" : "Profile"} Settings
									</h4>
								</div>

								{changePassword ? (
									<div className="row mt-3">
										{loadingPassword ? (
											<Loading />
										) : (
											<>
												{errorPassword && (
													<MessageBox variant="danger">
														{errorPassword}
													</MessageBox>
												)}
												<div className="col-md-12">
													<label className="labels"> Old Password</label>
													<input
														required
														type="password"
														className="form-control"
														onChange={(e) => setOldPassword(e.target.value)}
													/>
												</div>
												<div className="col-md-12">
													<label className="labels"> New Password</label>
													<input
														required
														type="password"
														className="form-control"
														onChange={(e) => setNewPassword(e.target.value)}
													/>
												</div>
												<div className="col-md-12">
													<label className="labels">Confirm Password</label>
													<input
														required
														type="password"
														className="form-control"
														onChange={(e) => setConfirmPassword(e.target.value)}
													/>
												</div>
											</>
										)}
									</div>
								) : (
									<div className="row mt-3">
										{loadingUpdate ? (
											<Loading />
										) : (
											<>
												{errorUpdate && (
													<MessageBox variant="danger">
														{errorUpdate}
													</MessageBox>
												)}
												<div className="col-md-12">
													<label className="labels">Name</label>
													<input
														required
														type="text"
														className="form-control"
														value={name}
														onChange={(e) => setName(e.target.value)}
													/>
												</div>
												<div className="col-md-12">
													<label className="labels">Email</label>
													<input
														required
														type="text"
														className="form-control"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
												<div className="col-md-12">
													<label className="labels">Avatar (url)</label>
													<input
														required
														type="text"
														className="form-control"
														value={avatar}
														onChange={(e) => setAvatar(e.target.value)}
													/>
												</div>
												<div className="col-md-12">
													<label className="labels">Role</label>
													<input
														required
														type="text"
														disabled
														className="form-control"
														value={role}
														onChange={(e) => setRole(e.target.value)}
													/>
												</div>
											</>
										)}
									</div>
								)}

								<div className="mt-5 text-center">
									<button
										className="btn btn-primary profile-button"
										type="button"
										onClick={() => submitHandler()}>
										Update
									</button>
								</div>
							</div>
						</div>
						<div className="col-md-4"></div>
					</div>
				)}
			</div>
		</div>
	);
}
