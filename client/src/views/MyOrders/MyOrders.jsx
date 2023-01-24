import React from "react";
import { useEffect, useState } from "react";
import { loginRequired } from "../../util/loginRequired";
import { CurrentUser } from "../../util/CurrentUser";
import axios from "axios";

function MyOrders() {
  useEffect(() => {
    loginRequired();
  }, []);

  const [myOrdersVar, setMyOrdersVar] = useState([]);
  const [tableNumberVar, setTableNumberVar] = useState("");

  async function fetchMyOrders() {
    const response = await axios.get(
      "http://localhost:5000/user-orders/?userId=" + CurrentUser.user._id
    );
    console.log(response.data.data.foodItems);
    setMyOrdersVar(response.data.data.foodItems);
    setTableNumberVar(response.data.data.tableNumber);
    // print the table number in console
    console.log(response.data.data.tableNumber);
  }

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Table Number</th>
            <th scope="col">Order Items</th>
            <th scope="col">Total Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {myOrdersVar.map((order) => {
            return (
              <tr>
                <td>{order._id}</td>
                <td>{tableNumberVar}</td>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
              </tr>
            );
          })}
          
        </tbody>
      </table>
    </div>
  );
}

export default MyOrders;
