import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";
import Product from "../components/product/Product";
import Pagination from "react-js-pagination";
import Title from "../components/Title";

export default function AllProducts() {
	const [currentPage, setCurrentPage] = useState(1);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listProducts({ pageNumber: currentPage, pageSize: 8 }));
	}, [dispatch, currentPage]);

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pageSize, productsCount } =
		productList;

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}

	return (
		<div className="row">
			<Title title={"All Products"} />

			<div className="container home col-md-12 ">
				{loading ? (
					<Loading />
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<>
						<h4>All Products</h4>
						<Product products={products} />
					</>
				)}
			</div>
			{pageSize <= productsCount && (
				<div className="d-flex justify-content-center mt-5 col-12">
					<Pagination
						activePage={currentPage}
						itemsCountPerPage={page}
						totalItemsCount={Math.floor(productsCount / pageSize + currentPage)}
						onChange={setCurrentPageNo}
						nextPageText={"Next"}
						prevPageText={"Prev"}
						itemClass="page-item"
						linkClass="page-link"
					/>
				</div>
			)}
		</div>
	);
}
