import React from "react";
import "./Login.css";

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
          
            <input type="submit"  id="login-btn" name="" value="Login" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
