import React from "react";
import { CurrentUser } from "../../util/CurrentUser";

function Home() {
  console.log(CurrentUser);
  return (
    <div>
      <h1>Welcome to Full Stack Cafe</h1>
      <h4>Hi, {CurrentUser ? CurrentUser.user.name : "Guest"}</h4>
      <p>
        Full Stack Cafe is a place where you can get delicious food and drinks.
      </p>
    </div>
  );
}

export default Home;
