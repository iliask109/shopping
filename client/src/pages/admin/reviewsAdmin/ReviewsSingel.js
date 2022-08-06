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
} from "../../../actions/productActions";
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../components/MessageBox";
import Loading from "../../../components/loading/Loading";
import Title from "../../../components/Title";

export default function ReviewsSingel() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const productReviews = useSelector((state) => state.productReviews);
	const { loading, reviews } = productReviews;
	const deleteReview = useSelector((state) => state.deleteReview);
	const { isDeleted } = deleteReview;

	useEffect(() => {
		dispatch(getProductReviewsAdmin(id));
	}, [dispatch, id]);

	// delete review
	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteReviewAdmin(reviewId, id));
	};
	
	if (isDeleted) {
		setTimeout(window.location.reload(), 1500);
	}

	return (
		<div className="reviews_admin">
			<Title title={"admin reviews"} />

	
			{isDeleted && (
				<MessageBox variant="success">The Review Delete</MessageBox>
			)}
			{loading ? (
				<Loading />
			) : (
				<TableContainer
					component={Paper}
					className="table"
					style={{ width: "100%" }}>
					<Table aria-label="simple table" style={{ minWidth: 600 }}>
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
			)}
		</div>
	);
}
