import React, { useState } from "react";
import "./FoodItemCard.css";

function FoodItemCard({ category, title, price, description, image }) {
  const [quantity, setQuantity] = useState(0);

  if (quantity < 0) {
    setQuantity(0);
  }

  return (
    <div className="col-md-3">
      <div className="card-container">
        <div className="card" style={{ width: "18rem" }}>
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-desc">{description}</p>
            <p className="card-text">₹{price}/-</p>

            {/*increment and decreament buttons for quantity */}
            <div className="d-flex">
              <button
                className="btn btn-primary m-2 fs-4 qty-change-btn"
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <p className="mx-3 align-middle fs-5 font-monospace qty-count">
                {quantity}
              </p>
              <button
                className="btn btn-primary m-2 fs-4"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>

            <a href="#" className="btn btn-primary">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemCard;
