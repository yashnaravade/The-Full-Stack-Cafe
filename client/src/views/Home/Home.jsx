import React from "react";
import { CurrentUser } from "../../util/CurrentUser";

function Home() {
  console.log(CurrentUser);
  function logOut() {
    localStorage.removeItem("currentUser");
  
  window.location.href = "/";
  }
  return (
    <div>
      {/* navbar */}
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
      {/* navbar */}

      <h1>Welcome to Full Stack Cafe</h1>
      <h4>Hi, {CurrentUser ? CurrentUser.user.name : "Guest"}</h4>
      <p>
        Full Stack Cafe is a place where you can get delicious food and drinks.
      </p>
    </div>
  );
}

export default Home;
