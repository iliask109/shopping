import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";
import Product from "../components/product/Product";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import Lists from "../components/sidebar/list";

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

	const numOfCategories = (category) => {
		let sum = 0;
		products?.map((item) => item.category === category && (sum = sum + 1));

		return sum;
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
						<div className="categories" id="scrollbar">
							<div className="boxes">
								{Lists.map((item) => (
									<div className="box" key={item.index}>
										<div className="icon"> {item.icon}</div>
										<div className="name">
											{" "}
											<span>{item.title}</span>
											<br />
											<Link
												to={`/search/category/${item.title}`}
												className="show">
												Show All
											</Link>
										</div>
										<div className="number">
											(<span>{numOfCategories(item.title)}</span>)
										</div>
									</div>
								))}
							</div>
						</div>
						<h4>Top Products</h4>
						<Product products={products} home={true} />
						<div className="see_more">
							<h4>Top Sales</h4> <Link to="/sales">See More</Link>
						</div>
						<Product products={topSales} home={true} />

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
