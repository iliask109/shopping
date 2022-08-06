import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
	updateUserPassword,
	updateUserProfile,
} from "../../actions/userActions";
import Loading from "../../components/loading/Loading";
import MessageBox from "../../components/MessageBox";
import Title from "../../components/Title";
import "./profile.scss";

export default function EditProfilePage() {
	const { pathname } = useLocation();

	let changePassword = pathname === "/me/updatePassword" ? true : false;

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const [name, setName] = useState(user?.user.name || "");
	const [email, setEmail] = useState(user?.user.email || "");
	const [avatar, setAvatar] = useState(user?.user.avatar || "");
	const [aboutMe, setAboutMe] = useState(user?.user.aboutMe || "");
	const [role, setRole] = useState(user?.user.role || "");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
	const {
		loading: loadingPassword,
		error: errorPassword,
		isUpdate: updatePassword,
	} = userUpdatePassword;
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		isUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = userUpdateProfile;

	// update user
	const submitHandler = () => {
		if (changePassword) {
			if (newPassword === confirmPassword) {
				dispatch(updateUserPassword({ oldPassword, newPassword }));
				if (updatePassword) {
					setOldPassword("");
					setNewPassword("");
					setConfirmPassword("");
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
					aboutMe,
				})
			);
		}
	};

	return (
		<div>
			<Title title={"Edit Profile"} />
			<div className="container edit_profile_page rounded bg-white mt-5 mb-5">
				{loading ? (
					<Loading></Loading>
				) : (
					<div className="row">
						{error && <MessageBox variant="danger">{error}</MessageBox>}

						<div className="col-md-3  border-right">
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
						<div className="col-md-5 ">
							{(isUpdate || updatePassword) && (
								<MessageBox variant="success">
									The update was successful
								</MessageBox>
							)}
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
														value={oldPassword}
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
													<label className="labels">About me </label>
													<textarea
														required
														type="text"
														className="form-control"
														value={aboutMe}
														onChange={(e) => setAboutMe(e.target.value)}
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
