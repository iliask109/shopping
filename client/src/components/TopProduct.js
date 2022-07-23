import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../actions/productActions";
import { Link } from "react-router-dom";

export default function TopProduct() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAdminProducts());
	}, [dispatch]);

	const productListAdmin = useSelector((state) => state.productListAdmin);
	const { products } = productListAdmin;

	return (
		<Carousel showArrows autoPlay showThumbs={false}>
			{products?.slice(0, 5).map((item) => (
				<div key={item.name}>
					<Link to={`/products/${item._id}`}>
						<img src={item.image} alt="item_image" />
						<p className="legend">{item.name}</p>
					</Link>
				</div>
			))}
		</Carousel>
	);
}
