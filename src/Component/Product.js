import React from "react";
import "../style/productDetails.css";

function Product({ productDetails }) {
  return <div className="productmainstyle"> {productDetails.title} </div>;
}

export default Product;
