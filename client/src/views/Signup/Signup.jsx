import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./Signup.css";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [role, setRole] = useState("user");

    console.log(name, email, phone, password, confirmPassword, error, role);

    async function SignupUser(e) {
        // e.preventDefault();
        const response = await axios.post("http://localhost:5000/signup", {
            name : name,
            email : email,
            phone : phone,
            password : password,
            role : role
        })
        console.log(response.data);
        // if(response.data.error) {
        //     setError(response.data.error);
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: `${error}`,
        //         });
        //     }
        // else {
        //     Swal.fire("Signup Successful");
        // }
    }   

  return (
    <>
      <div className="Signup-box">
      <h1>Sign Up</h1>
        <form>
          <div className="inputBox">
            <label>Name</label>
            <input type="text" name="" placeholder="Enter your name" required="required" onChange={(e)=> setName(e.target.value) } />
            <label>Email</label>
            <input type="email" name="" placeholder="Enter your email" required="required"  onChange={(e)=> setEmail(e.target.value) } />
            <label>Phone number</label>
            <input type="text" name="" placeholder="Enter your phone number" required="required"  onChange={(e)=> setPhone(e.target.value) } />
            <label>Password</label>
            <input type="password" name="" placeholder="Enter your password" required="required" onChange={(e)=> setPassword(e.target.value) }  />
            <label>Confirm Password</label>
            <input type="password" name="" placeholder="Confirm your password" required="required" onChange={(e)=> setConfirmPassword(e.target.value) }  />
            <button
              type="button"
              id="signup-btn"
              name="Signup"
              value="Signup"
            onClick={SignupUser}
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
