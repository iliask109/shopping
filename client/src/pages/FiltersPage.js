import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";
import Product from "../components/product/Product";
import Rating from "../components/rating/Rating";
import { prices, ratings } from "../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "../components/Title";

export default function FiltersPage() {
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
	const { category, name } = useParams();

	const [nameFilter, setFilterName] = useState(name ? name : "");
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(0);
	const [price, setPrice] = useState("");
	const [rating, setRating] = useState();
	const [categoryFilter, setCategoryFilter] = useState("");

	const [priceOpen, setPriceOpen] = useState(false);
	const [ratingOpen, setRatingOpen] = useState(false);
	const [categoryOpen, setCategoryOpen] = useState(true);
	const [SortProducts, setSortProducts] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setCategoryFilter(category);
		dispatch(
			listProducts({
				category: categoryFilter || category,
				min: min,
				max: max,
				rating: rating,
				name: nameFilter,
			})
		);
	}, [
		dispatch,
		category,
		min,
		max,
		rating,
		name,
		SortProducts,
		categoryFilter,
	]);

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const sortProducts = (value) => {
		if (value === "Latest items") {
			products.sort(function (a, b) {
				return new Date(b.createdAt) - new Date(a.createdAt);
			});
			setSortProducts(products);
		}
		if (value === "Most Popular") {
			products.sort(function (a, b) {
				return b.numOfSale - a.numOfSale;
			});
			setSortProducts(products);
		}
		if (value === "Cheapest") {
			products.sort(function (a, b) {
				return a.price - b.price;
			});

			setSortProducts(products);
		}
		if (value === "Most Expensive") {
			products.sort(function (a, b) {
				return b.price - a.price;
			});

			setSortProducts(products);
		}
	};

	return (
		<div>
			<Title title={"Search"} />
			<header className=" p-3 border">
				<div className="form-inline">
					<span className="mr-md-auto">{products?.length} Items found </span>
					<select
						className="mr-2 form-control"
						onChange={(e) => sortProducts(e.target.value)}>
						<option style={{ fontWeight: "bold" }} value={""}>
							Sort
						</option>
						<option value={"Latest items"}>Latest items</option>
						<option value={"Most Popular"}>Most Popular</option>
						<option value={"Cheapest"}>Cheapest</option>
						<option value={"Most Expensive"}>Most Expensive</option>
					</select>
				</div>
			</header>
			<div className="container  border p-0 bg-sec-light filter_page col-12">
				{error && <MessageBox variant="danger">{error}</MessageBox>}

				<div id="content">
					<div className="d-sm-flex">
						<div className="me-sm-12 ">
							<div id="filter" className="p-2 bg-light ms-md-5 ms-sm-3 border">
								<div className="border-bottom h5 text-uppercase">Filter By</div>
								<div className="box border-bottom">
									<div className="box-label text-uppercase d-flex align-items-center">
										Price
										<button
											className="btn ms-auto"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#inner-box"
											aria-expanded="false"
											aria-controls="inner-box">
											<span
												className={`fas ${priceOpen ? "fa-minus" : "fa-plus"}`}
												onClick={() => setPriceOpen(!priceOpen)}></span>
										</button>
									</div>
									{priceOpen && (
										<div id="inner-box" className="collapse show">
											{prices.map((item) => (
												<div
													className="form-inline border rounded p-sm-1 my-2"
													key={item.name}>
													<input
														type="radio"
														name="type"
														onChange={() => {
															setMin(item.min);
															setMax(item.max);
															setPrice(item.name);
														}}
													/>
													<label className="pl-1 pt-sm-0 pt-1">
														{item.name}
													</label>
												</div>
											))}
										</div>
									)}
								</div>
								<div className="box border-bottom">
									<div className="box-label text-uppercase d-flex align-items-center">
										Ratings
										<button
											className="btn ms-auto"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#inner-box"
											aria-expanded="false"
											aria-controls="inner-box">
											<span
												className={`fas ${ratingOpen ? "fa-minus" : "fa-plus"}`}
												onClick={() => setRatingOpen(!ratingOpen)}></span>{" "}
										</button>
									</div>
									{ratingOpen && (
										<div id="inner-box" className="collapse show">
											{ratings.map((item) => (
												<div
													className="form-inline border rounded p-sm-1 my-2"
													key={item.name}>
													<input
														type="radio"
														name="type"
														onChange={() => {
															setRating(item.rating);
														}}
													/>
													<label className="pl-1 pt-sm-2 pt-1">
														<Rating
															caption={"& up"}
															rating={item.rating}></Rating>
													</label>
												</div>
											))}
										</div>
									)}
								</div>
								<div className="box ">
									<div className="box-label text-uppercase d-flex align-items-center">
										Category
										<button
											className="btn ms-auto"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#inner-box"
											aria-expanded="false"
											aria-controls="inner-box">
											<span
												className={`fas ${
													categoryOpen ? "fa-minus" : "fa-plus"
												}`}
												onClick={() =>
													setCategoryOpen(!categoryOpen)
												}></span>{" "}
										</button>
									</div>
									{categoryOpen && (
										<div id="inner-box" className="collapse show">
											{categories.map((item) => (
												<div
													className="form-inline border rounded p-sm-1 my-2"
													key={item.name}>
													<input
														type="radio"
														name="type"
														value={categoryFilter}
														onChange={() => {
															setCategoryFilter(item);
														}}
													/>
													<label className="pl-1 pt-sm-2 pt-1">{item}</label>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
						{loading ? (
							<Loading />
						) : error ? (
							<MessageBox variant="danger">{error}</MessageBox>
						) : (
							<div className="bg-white p-2 border col-md-12 col-sm-6 col-l-6 ">
								<div className="filter_name">
									{categoryFilter && (
										<div className="item" onClick={() => setCategoryFilter("")}>
											{categoryFilter}
										</div>
									)}
									{name && (
										<div className="item" onClick={() => setFilterName("")}>
											{name}
										</div>
									)}
									{price && (
										<div
											className="item"
											onClick={() => {
												setMin(0);
												setMax(0);
												setPrice("");
											}}>
											{price}
										</div>
									)}{" "}
									{rating && (
										<div className="item ratings" onClick={() => setRating("")}>
											<Rating caption={"& up"} rating={rating}></Rating>
										</div>
									)}
								</div>
								<hr />
								<Product products={SortProducts ? SortProducts : products} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
