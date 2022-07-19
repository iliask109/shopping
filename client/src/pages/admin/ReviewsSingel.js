import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
	deleteReviewAdmin,
	getProductReviewsAdmin,
} from "../../actions/productActions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../components/MessageBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ReviewsSingel() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const productReviews = useSelector((state) => state.productReviews);
	const { loading, reviews } = productReviews;
	const deleteReview = useSelector((state) => state.deleteReview);
	const { isDeleted } = deleteReview;

	useEffect(() => {
		dispatch(getProductReviewsAdmin(id));
	}, [dispatch, id]);

	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteReviewAdmin(reviewId, id));
	};
	if (isDeleted) {
		setTimeout(window.location.reload(), 1500);
	}

	return (
		<div>
			<button className="goBack" onClick={() => navigate(-1)}>
				<ArrowBackIcon className="icon" />
			</button>
			{isDeleted && (
				<MessageBox variant="success">The Review Delete</MessageBox>
			)}
			<TableContainer component={Paper} className="table">
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className="tableCell">Reviews ID</TableCell>
							<TableCell className="tableCell">Date</TableCell>
							<TableCell className="tableCell">Customer Name</TableCell>
							<TableCell className="tableCell">Rating</TableCell>
							<TableCell className="tableCell">Comment</TableCell>
							<TableCell className="tableCell">Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reviews?.map((row) => (
							<TableRow key={row._id}>
								<TableCell className="tableCell">{row._id}</TableCell>

								<TableCell className="tableCell">
									{row.createdAt.slice(0, 10)}
								</TableCell>
								<TableCell className="tableCell">{row.name}</TableCell>
								<TableCell className="tableCell">{row.rating}</TableCell>
								<TableCell className="tableCell">{row.comment}</TableCell>
								<TableCell className="tableCell">
									<div
										className="deleteButton"
										onClick={() => deleteReviewHandler(row._id)}>
										Delete
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
