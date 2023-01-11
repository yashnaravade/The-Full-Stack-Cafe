import React from "react";
import "./Login.css";
import Swal from "sweetalert2";

function Login() {
  return (
    <>
      <div className="Login-box">
        <h1>Login</h1>
        <form>
          <div className="inputBox">
            <label>Username</label>
            <input type="text" name="" required="required" />

            <label>Password</label>
            <input type="password" name="" required="required" />

            <button
              type="button"
              id="login-btn"
              name="Login"
              value="Login"
              onClick={() => {
                Swal.fire("Login Successful");
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
