import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import "./Login.css";
import { CurrentUser } from "../../util/CurrentUser";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (CurrentUser) {
  }

  console.log(email, password);

  async function LoginUser(e) {
    axios
      .post("https://the-full-stack-cafe-backend.vercel.app/login", {
        email: email,
        password: password,
      })

      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
        });
        console.log(result.data);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        localStorage.setItem("currentUser", JSON.stringify(result.data));
      })
      .catch((err) => {
        let errmsg = JSON.stringify(err.response.data);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errmsg,
        });
        localStorage.removeItem("currentUser");
      });
  }

  return (
    <>
      <div className="Login-box">
        <h1>Login</h1>
        <form>
          <div className="inputBox">
            <label>Email or Phone</label>
            <input
              type="text"
              name=""
              placeholder="Enter your email"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              name=""
              placeholder="Enter your password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              id="login-btn"
              name="Login"
              value="Login"
              onClick={LoginUser}
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
