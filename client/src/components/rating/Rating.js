import React from "react";
import "./rating.css";
export default function Rating({ rating, numReviews, caption }) {
  return (
    <div className="rating container">
      {rating >= 1 && (
        <span>
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
      )}
      {rating >= 2 && (
        <span>
          <i
            className={
              rating >= 2
                ? "fa fa-star"
                : rating >= 1.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
      )}
      {rating >= 3 && (
        <span>
          <i
            className={
              rating >= 3
                ? "fa fa-star"
                : rating >= 2.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
      )}
      {rating >= 4 && (
        <span>
          <i
            className={
              rating >= 4
                ? "fa fa-star"
                : rating >= 3.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
      )}
      {rating >= 5 && (
        <span>
          <i
            className={
              rating >= 5
                ? "fa fa-star"
                : rating >= 4.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
      )}
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{numReviews + " Reviews"}</span>
      )}
    </div>
  );
}
