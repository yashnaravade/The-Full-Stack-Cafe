import React from "react";
import { useState } from "react";
import { CurrentUser } from "../../util/CurrentUser";
import "./Navbar.css";

import FoodItemList from "../../util/FoodItemList";
import { Link } from "react-router-dom";

function Navbar() {
  const [foodItemCount, setFoodItemCount] = useState(
    FoodItemList.FoodItemListCount
  );

  function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Full Stack Cafe
        </a>

        {/* login and signup buttons on the right */}
        <div className="d-flex">
          <Link to="/myCart">
            {CurrentUser ? (
              <a className="btn btn-outline-primary mx-1" href="/myCart">
                Cart ({foodItemCount})
              </a>
            ) : null}
          </Link>

          {/* dont show the login button if the user if logged in */}
          {!CurrentUser ? (
            <a className="btn btn-outline-primary mx-1" href="/login">
              Login
            </a>
          ) : null}

          {/* dont show the signup button if the user if logged in */}
          {!CurrentUser ? (
            <a className="btn btn-outline-primary mx-1" href="/signup">
              Signup
            </a>
          ) : null}

          {CurrentUser ? (
            <button className="btn btn-outline-primary mx-1" onClick={logOut}>
              Log Out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
