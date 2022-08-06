import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loading from "../../components/loading/Loading";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/product/Product";
import Title from "../../components/Title";
import "./product.scss";

export default function SalesPage() {
	const dispatch = useDispatch();
	const [SortProducts, setSortProducts] = useState("");

	useEffect(() => {
		dispatch(
			listProducts({
				discount: 1,
			})
		);
	}, [dispatch, SortProducts]);

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	//sort
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
		<div className="container home col-md-12 ">
			<Title title={"Sales"} />

			{loading ? (
				<Loading />
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					<header className="border-bottom mb-4 pb-3 m-4">
						<div className="form-inline">
							<span className="mr-md-auto">
								{products?.length} Items found{" "}
							</span>
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
					<h1>Sales</h1>
					<Product products={SortProducts ? SortProducts : products} />
				</>
			)}
		</div>
	);
}
