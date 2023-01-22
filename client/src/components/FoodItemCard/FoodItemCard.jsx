import React, { useState } from "react";
import Swal from "sweetalert2";
import "./FoodItemCard.css";

function FoodItemCard({ category, title, price, description, image }) {
  const [quantity, setQuantity] = useState(1);

  if (quantity < 0) {
    setQuantity(0);
  }

  async function AddToCart() {
    const cartObj = {
      name: title,
      price: price,
      quantity: quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartObj);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log(existingCart);

    await Swal.fire ({
      title: "Added to Cart",
      text: "Item added to cart successfully",
      icon: "success",
      confirmButtonText: "OK",
    });

    // setQuantity(1);

    window.location.reload();

  }

  return (
    <div className="col-md-3">
      <div className="card-container">
        <div className="card" style={{ width: "18rem" }}>
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-desc">{description || title} </p>
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

            <button
              href="#"
              className="btn btn-primary"
              onClick={() => {
                AddToCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemCard;
