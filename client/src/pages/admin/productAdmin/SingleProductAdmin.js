import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import MessageBox from "../../../components/MessageBox";
import { Form } from "react-bootstrap";
import { detailsProduct, updateProduct } from "../../../actions/productActions";
import Title from "../../../components/Title";

export default function SingleProductAdmin() {
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
	const productDetails = useSelector((state) => state.productDetails);

	const { id } = useParams();
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [discount, setDiscount] = useState(0);
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [category, setCategory] = useState("");
	const [seller, setSeller] = useState("");
	const [stock, setStock] = useState("");

	const { loading, error, product } = productDetails;
	const productUpdateAdmin = useSelector((state) => state.productUpdateAdmin);
	const { isUpdate, error: errorUpdate } = productUpdateAdmin;

	useEffect(() => {
		if (!product || product._id !== id) {
			dispatch(detailsProduct(id));
		} else {
			setName(product?.name);
			setPrice(product?.price);
			setDescription(product?.description);
			setOldImages(product?.images);
			setCategory(product?.category);
			setSeller(product?.seller);
			setStock(product?.stock);
			setDiscount(product?.discount);
		}
	}, [dispatch, id, loading, product]);

	// update product
	const submitHandler = (e) => {
		e.preventDefault();

		if (images.length > 0) {
			dispatch(
				updateProduct(id, {
					name,
					price,
					discount,
					description,
					images,
					category,
					seller,
					stock,
				})
			);
		} else {
			dispatch(
				updateProduct(id, {
					name,
					price,
					discount,
					description,
					category,
					seller,
					stock,
				})
			);
		}
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);
		setOldImages([]);

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

	return (
		<div>
			<Title title={"admin products"} />

			<div className=" container product_admin rounded bg-white mt-5 mb-5 ">
				{loading ? (
					<Loading></Loading>
				) : (
					<div className="row">
						<div className="col-md-4 border-right "></div>
						<div className="col-md-5 ">
							{error && <MessageBox variant="danger">{error}</MessageBox>}

							{errorUpdate && (
								<MessageBox variant="danger">{errorUpdate}</MessageBox>
							)}

							{isUpdate && (
								<MessageBox variant="success">
									The update was successful
								</MessageBox>
							)}
							<form className="p-3 py-5" onSubmit={submitHandler}>
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4 className="text-right">Product Settings</h4>
								</div>

								<div className="row mt-3">
									<div className="col-md-12">
										<label className="labels">Name Product</label>
										<input
											type="text"
											className="form-control"
											value={name}
											required
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Price</label>
										<input
											type="text"
											className="form-control"
											value={price}
											required
											onChange={(e) => setPrice(e.target.value)}
										/>
									</div>
									<div className="col-md-12">
										<label className="labels">Discount</label>
										<input
											type="number"
											className="form-control"
											value={discount}
											max="90"
											onChange={(e) => setDiscount(e.target.value)}
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
											/>
											<label className="custom-file-label" htmlFor="customFile">
												Choose Images
											</label>
										</div>

										{oldImages &&
											oldImages.map((img, i) => (
												<img
													key={i}
													src={img.url}
													alt={img.url}
													className="mt-3 mr-2 mb-3"
													width="55"
													height="52"
												/>
											))}

										{imagesPreview.map((img, i) => (
											<img
												src={img}
												key={i}
												alt="Images Preview"
												className="mt-3 mr-2 mb-3"
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
											type="text"
											required
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
											required
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
										type="submit">
										Update
									</button>
								</div>
							</form>
						</div>
						<div className="col-md-4"></div>
					</div>
				)}
			</div>
		</div>
	);
}
