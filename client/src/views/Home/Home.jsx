import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { CurrentUser } from "../../util/CurrentUser";
import "./Home.css";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard";

function Home() {
  const [search, setSearch] = useState("");
  const [currentItems, setCurrentItems] = useState([]);

  async function fetchSpecificItem() {
    console.log("fetching specific item");
    const response = await axios.get(
      `http://localhost:5000/food-item?title=${search}`
    );
    console.log(response.data.data);
    setCurrentItems(response.data.data);
  }
  async function fetchAllItems() {
    console.log("fetching all items");
    const response = await axios.get(`http://localhost:5000/all-food-items`);
    console.log(response.data.data);
    setCurrentItems(response.data.data);
  }

  useEffect(() => {
    if (search.length > 2) {
      fetchSpecificItem();
    } else {
      fetchAllItems();
    }
  }, [search]);

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
      <div className="show-items-container">
        {
          currentItems.map((item, index) => {
            return (
              <FoodItemCard
                // key={item._id} 
                key={index}
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.imgURL}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default Home;
