import React from "react";
import "./BookTable.css";
import { useEffect, useState } from "react";
import { loginRequired } from "../../util/loginRequired";
import axios from "axios";
import Swal from "sweetalert2";
import { CurrentUser } from "../../util/CurrentUser";

function BookTable() {
  useEffect(() => {
    loginRequired();
  }, []);

  const [availableTables, setAvailableTables] = useState([]);

  useEffect(() => {
    async function getAvailableTables() {
      const response = await axios.get(
        "http://localhost:5000/available-tables"
      );
      console.log(response.data.data);
      setAvailableTables(response.data.data);
    }
    getAvailableTables();
  }, []);

  async function bookTable() {
    console.log("table number is", localStorage.getItem("tableNumber"));
    const response = await axios.post("http://localhost:5000/book-table", {
      userId: CurrentUser.user._id,
      tableNumber: localStorage.getItem("tableNumber"),
    });
    console.log(response.data.data);

    Swal.fire({
      title: "Success",
      text: "Table Booked Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
    window.location.href = "/myOrders";
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Book Table</h1>
          {/* show the available tables with the book table button with it */}
          {/* <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Table Number</th>
                <th scope="col">Book Table</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <button className="btn btn-primary">Book Table</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <button className="btn btn-primary">Book Table</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <button className="btn btn-primary">Book Table</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <button className="btn btn-primary">Book Table</button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <button className="btn btn-primary">Book Table</button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  <button className="btn btn-primary">Book Table</button>
                </td>
              </tr>
            </tbody>
          </table> */}

          {/* show available tables from response of getAvailableTables function in the tabular format  */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Table Number</th>
                <th scope="col">Book Table</th>
              </tr>
            </thead>
            <tbody>
              {availableTables.map((item, index) => {
                return (
                  <tr>
                    <td>{item.tableNumber}</td>

                    <td>
                      {/* save the particular table number in localstorage when clicked and call and booktable function*/}
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          localStorage.setItem("tableNumber", item.tableNumber);
                          bookTable();
                        }}
                      >
                        Book Table
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookTable;
