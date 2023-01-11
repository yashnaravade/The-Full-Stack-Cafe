import React from "react";
import Swal from "sweetalert2";
import "./Signup.css";

function Signup() {
  return (
    <>
 

      <div className="Signup-box">
      <h1>Sign Up</h1>
        <form>
          <div className="inputBox">
            <label>Name</label>
            <input type="text" name="" required="required" />
            <label>Email</label>
            <input type="email" name="" required="required" />
            <label>Phone number</label>
            <input type="text" name="" required="required" />
            <label>Password</label>
            <input type="password" name="" required="required" />
            <label>Confirm Password</label>
            <input type="password" name="" required="required" />
            <button
              type="submit"
              id="signup-btn"
              name="Signup"
              value="Signup"
              onClick={() => {
                Swal.fire("Signup Successful");
              }}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
