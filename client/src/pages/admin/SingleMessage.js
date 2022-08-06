import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	confirmMessageAdmin,
	deleteMessageAdmin,
	detailsMessage,
} from "../../actions/messageActions";
import Loading from "../../components/loading/Loading";
import MessageBox from "../../components/MessageBox";

export default function SingleMessage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [meg, setMeg] = useState("");
	const [editor, setEditor] = useState(false);

	const singleMessage = useSelector((state) => state.singleMessage);
	const { loading, error, message } = singleMessage;

	const confirmMessage = useSelector((state) => state.confirmMessage);
	const { isUpdate } = confirmMessage;

	const deleteMessage = useSelector((state) => state.deleteMessage);
	const { isDeleted } = deleteMessage;

	useEffect(() => {
		dispatch(detailsMessage(id));
	}, [dispatch, id]);

	// delete message
	const deleteHandler = () => {
		dispatch(deleteMessageAdmin(id));
	};

	// confirm message
	const confirmHandler = () => {
		dispatch(confirmMessageAdmin(id, meg));
	};

	if (isDeleted) {
		setTimeout(() => {
			navigate("/admin");
		}, 1500);
	}

	if (isUpdate) {
		setTimeout(() => {
			navigate("/admin");
		}, 1500);
	}
	
	return (
		<div>
			{error && <MessageBox variant="danger"> {error}</MessageBox>}
			{loading ? (
				<Loading />
			) : (
				message && (
					<>
						<div className="message card">
							<div className="header_message">
								<div> {message?.subject}</div>
								<div> {message?.email}</div>
							</div>
							<div className="body_message">{message?.message}</div>

							<div className="footer_message">
								name : {message?.name}
								<br />
								phone : {message?.phone}
								<br />
								createdAt : {message?.createdAt?.slice(0, 10)}
							</div>
						</div>

						<div className="action_message">
							<div className="action_message_send">
								<button
									className="btn btn-primary "
									onClick={() => setEditor(true)}>
									Send Message
								</button>
								<button
									className="btn btn-success "
									onClick={() => confirmHandler()}>
									Confirm
								</button>
							</div>
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => deleteHandler()}>
								Delete
							</button>
						</div>
					</>
				)
			)}
			{editor && (
				<div className="form-group">
					<textarea
						name="txtMsg"
						className="form-control"
						placeholder="Your Message *"
						value={meg}
						onChange={(e) => setMeg(e.target.value)}
						style={{ width: "100%", height: "150px" }}></textarea>
					<button
						className="btn btn-success mt-4 "
						onClick={() => confirmHandler()}>
						Send Message
					</button>
				</div>
			)}
		</div>
	);
}
