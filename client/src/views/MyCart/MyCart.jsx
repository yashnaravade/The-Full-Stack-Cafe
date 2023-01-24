import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MyCart.css";
import FoodItemList from "../../util/FoodItemList";
import axios from "axios";
import { CurrentUser } from "../../util/CurrentUser";
import Swal from "sweetalert2";

function MyCart() {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  async function placeOrder() {
    const userId = CurrentUser.user._id;

    if (isOrderPlaced) {
      const response = await axios.post("http://localhost:5000/order-food", {
        tableNumber: 69,
        userId: CurrentUser.user._id,
        foodItems: FoodItemList.FoodItemCart,
      });

      // set the isOrderPlaced state to true so that the next time the user clicks on the place order button, the update order route is called instead of the place order route
      async function setTheState() {
        setIsOrderPlaced(true);
        console.log("setTheState wala click hua hai" + isOrderPlaced);
      }
      setTheState();

      console.log("Order Placed wala click hua hai" + isOrderPlaced);
      console.log(response);
      if (response.data.success) {
        localStorage.removeItem("cart");
        Swal.fire({
          title: "Order Placed",
          text: "Your order has been placed successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        window.location.href = "/";
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }

    if (!isOrderPlaced) {
      const response = await axios.put("http://localhost:5000/update-order", {
        userId: CurrentUser.user._id,
        foodItems: FoodItemList.FoodItemCart,
      });

      setIsOrderPlaced(true);
      console.log(response);
      console.log("Update Order wala click hua hai");
      if (response.data.success) {
        localStorage.removeItem("cart");
        Swal.fire({
          title: "Order Placed",
          text: "Your order has been placed successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        window.location.href = "/";
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }

    console.log("dono mai nhi ghusa" + isOrderPlaced);
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-center">My Cart</h1>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  {/* <th scope="col">Total</th> */}
                </tr>
              </thead>
              <tbody>
                {FoodItemList.FoodItemCart.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      {/* <td>{item.total}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={placeOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
