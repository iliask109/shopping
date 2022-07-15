import React from "react";
import "./loading.css";

export default function Loading() {
  return (
    <div className="container">
      <div className="row">
        <div id="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="lading"></div>
        </div>
      </div>
    </div>
  );
}
