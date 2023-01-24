import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard";
import { loginRequired } from "../../util/loginRequired";
import { CurrentUser } from "../../util/CurrentUser";
import Navbar from "../../components/Navbar/Navbar";
import FoodItemList from "../../util/FoodItemList";

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
    loginRequired();
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      fetchSpecificItem();
    } else {
      fetchAllItems();
    }
  }, [search]);

  function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }


  return (
    <div>
      <Navbar />
     
      <h1>Welcome to Full Stack Cafe</h1>
      <h4>Hi, {CurrentUser ? CurrentUser.user.name : "Guest"}</h4>

      <div className="option-btns">
    {CurrentUser && FoodItemList.FoodItemCart.length > 0 && ( 
        <a href="/myCart" className="btn btn-primary m-2">
          Go to your cart
          </a>
          )}

          {/* show available tables */}
          <a className="btn btn-primary m-2" href="/bookTable">Show available tables</a>


   

      </div>

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
        <div className="row mt-3">
          {currentItems.map((item, index) => {
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
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
