import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";
import Product from "../components/product/Product";
import Title from "../components/Title";
import { Link } from "react-router-dom";

export default function Home() {
	const dispatch = useDispatch();
	const topSales = [];
	useEffect(() => {
		dispatch(listProducts({}));
	}, [dispatch]);

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	products?.forEach((item) => {
		if (item.discount > 0) {
			topSales.push(item);
		}
	});
	var categories = products?.map((item) => item.category);

	var distribution = {},
		max = 0,
		result = [];

	categories?.forEach(function (a) {
		distribution[a] = (distribution[a] || 0) + 1;
		if (distribution[a] > max) {
			max = distribution[a];
			result = [a];
			return;
		}
		if (distribution[a] === max) {
			result.push(a);
		}
	});

	const topProducts = () => {
		products
			?.sort(function (a, b) {
				return b.numOfSale - a.numOfSale;
			})
			.slice(0, 4);

		return products;
	};

	return (
		<div className="row pt-2">
			<Title title={"Home"} />

			<div className="container home col-md-12 ">
				{loading ? (
					<Loading />
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<>
						<h4>Top Products</h4>
						<Product products={topProducts()} home={true} />
						<div className="see_more">
							<h4>Top Sales</h4> <Link to="/sales">See More</Link>
						</div>
						<Product products={topSales} home={true} />
						<div>
							<h4>Top Categories</h4>
						</div>
						<div className="categories">
							{Object.keys(distribution)
								?.slice(0, 5)
								.map((item, i) => (
									<div className="box" key={i}>
										<Link to={`/search/category/${item}`}>{item}</Link>
									</div>
								))}
						</div>
						<div className="see_more">
							<h4>All Products</h4> <Link to="/products">See More</Link>
						</div>
						<Product products={products} home={true} />
					</>
				)}
			</div>
		</div>
	);
}
