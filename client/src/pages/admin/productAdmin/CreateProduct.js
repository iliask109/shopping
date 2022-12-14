import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import MessageBox from "../../../components/MessageBox";
import { Form } from "react-bootstrap";
import { clearErrors, newProductAdmin } from "../../../actions/productActions";
import Title from "../../../components/Title";

export default function CreateProduct() {
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
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const newProduct = useSelector((state) => state.newProduct);
	const { loading, error, success } = newProduct;

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [category, setCategory] = useState(categories[0]);
	const [seller, setSeller] = useState(userInfo?.name);
	const [stock, setStock] = useState("");

	// create product
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			newProductAdmin({
				name,
				price,
				description,
				images,
				category,
				seller,
				stock,
			})
		);
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((oldArray) => [...oldArray, reader.result]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	useEffect(() => {
		if (error) {
			alert(error);
			dispatch(clearErrors());
		}

		if (success) {
			if (userInfo.role === "admin") {
				navigate("/admin/products");
			} else {
				navigate("/seller");
			}
			alert("Product created successfully");
		}
	}, [dispatch, error, success, navigate, userInfo.role]);

	return (
		<div>
			<Title title={"new product"} />

			<div className="container create_product rounded bg-white mt-5 mb-5">
				{loading ? (
					<Loading></Loading>
				) : (
					<>
						{error && <MessageBox variant="danger">{error}</MessageBox>}
						<div className="row">
							<div className="col-md-4 border-right">
								
							</div>
							<div className="col-md-5 border-right">
								<form className="p-3 py-5" onSubmit={submitHandler}>
									<div className="d-flex justify-content-between align-items-center mb-3">
										<h4
											className="text-right"
											style={{ textDecoration: "underline" }}>
											New Product
										</h4>
									</div>

									<div className="row mt-3">
										<div className="col-md-12">
											<label className="labels">Name Product</label>
											<input
												type="text"
												required
												className="form-control"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="col-md-12">
											<label className="labels">Price</label>
											<input
												type="number"
												required
												min={0}
												className="form-control"
												value={price}
												onChange={(e) => setPrice(e.target.value)}
											/>
										</div>
										<div className="col-md-12">
										
											<label>Images</label>
											<div className="custom-file">
												<input
													type="file"
													name="product_images"
													className="custom-file-input"
													id="customFile"
													onChange={onChange}
													multiple
													required
												/>
												<label
													className="custom-file-label"
													htmlFor="customFile">
													Choose Images
												</label>
											</div>
											{imagesPreview.map((img) => (
												<img
													src={img}
													key={img}
													alt="Images Preview"
													className="mt-3 mr-2"
													width="55"
													height="52"
												/>
											))}
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
												type="number"
												className="form-control"
												value={stock}
												min={0}
												required
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
												required
												onChange={(e) => setDescription(e.target.value)}
												style={{ height: "300px" }}
											/>
										</div>
									</div>

									<div className="mt-5 text-center">
										<button
											className="btn btn-primary profile-button"
											type="submit">
											Create
										</button>
									</div>
								</form>
							</div>
							<div className="col-md-4"></div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
