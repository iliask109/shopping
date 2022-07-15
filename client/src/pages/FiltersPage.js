import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/MessageBox";
import Product from "../components/product/Product";
import Rating from "../components/rating/Rating";
import { prices, ratings } from "../utils";

export default function FiltersPage() {
  const { category, name } = useParams();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [rating, setRating] = useState();

  const [priceOpen, setPriceOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listProducts({
        category: category,
        min: min,
        max: max,
        rating: rating,
        name: name,
      })
    );
  }, [dispatch, category, min, max, rating, name]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  return (
    <div className="container my-sm-5 border p-0 bg-sec-light filter_page">
      <div id="content">
        <div className="bg-light p-2 px-md-4 px-3 shadow-sm">
          <div className="d-flex align-items-center">
            <div className="user-select-none">Home</div>
            <div className="fas fa-angle-right px-2"></div>
            <div id="navigator" className="text-primary"></div>
          </div>
        </div>

        <div className="d-sm-flex">
          <div className="me-sm-3">
            <div id="filter" className="p-2 bg-light ms-md-4 ms-sm-2 border">
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
                    aria-controls="inner-box"
                  >
                    <span
                      className={`fas ${priceOpen ? "fa-minus" : "fa-plus"}`}
                      onClick={() => setPriceOpen(!priceOpen)}
                    ></span>
                  </button>
                </div>
                {priceOpen && (
                  <div id="inner-box" className="collapse show">
                    {prices.map((item) => (
                      <div
                        className="form-inline border rounded p-sm-1 my-2"
                        key={item.name}
                      >
                        <input
                          type="radio"
                          name="type"
                          onChange={() => {
                            setMin(item.min);
                            setMax(item.max);
                          }}
                        />
                        <label className="pl-1 pt-sm-0 pt-1">{item.name}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="box ">
                <div className="box-label text-uppercase d-flex align-items-center">
                  Ratings
                  <button
                    className="btn ms-auto"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#inner-box"
                    aria-expanded="false"
                    aria-controls="inner-box"
                  >
                    <span
                      className={`fas ${ratingOpen ? "fa-minus" : "fa-plus"}`}
                      onClick={() => setRatingOpen(!ratingOpen)}
                    ></span>{" "}
                  </button>
                </div>
                {ratingOpen && (
                  <div id="inner-box" className="collapse show">
                    {ratings.map((item) => (
                      <div
                        className="form-inline border rounded p-sm-1 my-2"
                        key={item.name}
                      >
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
                            rating={item.rating}
                          ></Rating>
                        </label>
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
            <div className="bg-white p-2 border">
              <b>{products.length}</b> Products <Product products={products} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
