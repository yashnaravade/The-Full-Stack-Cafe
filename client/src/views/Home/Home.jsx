import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { CurrentUser } from "../../util/CurrentUser";
import "./Home.css";

function Home() {

  // console.log(CurrentUser);
  function logOut() {
    localStorage.removeItem("currentUser");

    window.location.href = "/";
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Full Stack Cafe
          </a>

          {/* login and signup buttons on the right */}
          <div className="d-flex">
            <a className="btn btn-outline-primary mx-1" href="/login">
              Login
            </a>
            <a className="btn btn-outline-primary" href="/signup">
              Signup
            </a>
            <button onClick={logOut}>
              <a className="btn btn-outline-primary">Logout</a>
            </button>
          </div>
        </div>
      </nav>

      <h1>Welcome to Full Stack Cafe</h1>
      <h4>Hi, {CurrentUser ? CurrentUser.user.name : "Guest"}</h4>

      <div className="search-container">
        <input
          type="text "
          className="search-bar"
          placeholder="Search for food, drinks, etc..."
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "50%" }}
        />
      </div>
      
    </div>
  );
}

export default Home;
