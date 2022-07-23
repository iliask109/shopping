import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import MessageBox from "../../components/MessageBox";
import { Form } from "react-bootstrap";
import { detailsProduct, updateProduct } from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Title from "../../components/Title";

export default function SingleProductSeller() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	const productUpdateAdmin = useSelector((state) => state.productUpdateAdmin);
	const { success } = productUpdateAdmin;

	const { id } = useParams();
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");
	const [seller, setSeller] = useState("");
	const [stock, setStock] = useState("");

	useEffect(() => {
		dispatch({ type: UPDATE_PRODUCT_RESET });

		if (!product || product._id !== id) {
			dispatch(detailsProduct(id));
		} else {
			setName(product?.name);
			setPrice(product?.price);
			setDescription(product?.description);
			setImage(product?.image);
			setCategory(product?.category);
			setSeller(product?.seller);
			setStock(product?.stock);
		}
	}, [dispatch, id, loading, product]);

	const submitHandler = () => {
		dispatch(
			updateProduct(id, {
				name,
				price,
				description,
				image,
				category,
				seller,
				stock,
			})
		);
		if (success) {
			navigate("/seller");
		}
	};

	const categories = [
		"Electronics",
		"Cameras",
		"Laptops",
		"Accessories",
		"Headphones",
		"Food",
		"Books",
		"Clothes/Shoes",
		"Beauty/Health",
		"Sports",
		"Outdoor",
		"Home",
	];

	return (
		<div>
			<Title title={"seller products"} />

			<div className="container rounded bg-white mt-5 mb-5">
				{loading ? (
					<Loading></Loading>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<div className="row">
						<div className="col-md-3 border-right"></div>
						<div className="col-md-5 border-right">
							<div className="p-3 py-5">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4 className="text-right">Profile Settings</h4>
								</div>

								<div className="row mt-3">
									<div className="col-md-12">
										<label className="labels">Name Product</label>
										<input
											type="text"
											className="form-control"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Price</label>
										<input
											type="text"
											className="form-control"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
										/>
									</div>

									<div className="col-md-12">
										<label className="labels">Image (url)</label>
										<input
											type="text"
											className="form-control"
											value={image}
											onChange={(e) => setImage(e.target.value)}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Category</label>

										<Form.Select
											value={category}
											className="form-control"
											onChange={(e) => setCategory(e.target.value)}>
											{categories.map((item, index) => (
												<option value={item} key={index}>
													{item}
												</option>
											))}
										</Form.Select>
									</div>
									<div className="col-md-12">
										<label className="labels">Stock</label>
										<input
											type="text"
											className="form-control"
											value={stock}
											onChange={(e) => setStock(e.target.value)}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Seller</label>
										<input
											disabled
											type="text"
											className="form-control"
											value={seller}
											onChange={(e) => setSeller(e.target.value)}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Description</label>
										<textarea
											type="text"
											className="form-control"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											style={{ height: "300px" }}
										/>
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
						</div>
						<div className="col-md-4"></div>
					</div>
				)}
			</div>
		</div>
	);
}
