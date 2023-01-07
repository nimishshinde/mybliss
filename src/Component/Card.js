import React from "react";
import "../style/card.css";

function Card({ data }) {
  return (
    <div className="maincardstyle">
      <div className="saletag" > Sale </div>
      <img src={data.image.src} className="imgstyle" />
      <text className="productheading"> {data.title} </text>
      <div className="pricecls" >
        <small className="cutpricestyle">
          {" "}
          INR {data.variants[0].compare_at_price}
        </small>
        <span className="pricestyle"> INR{data.variants[0].price}</span>
      </div>
    </div>
  );
}

export default Card;
