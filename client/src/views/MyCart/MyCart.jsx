import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MyCart.css";
import FoodItemList from "../../util/FoodItemList";

function MyCart() {
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
                <button className="btn btn-primary">Confirm Order</button>
                </div>
                </div>

      </div>
    </div>
  );
}

export default MyCart;
