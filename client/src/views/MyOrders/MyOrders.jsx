import React from "react";
import { useEffect } from "react";
import { loginRequired } from "../../util/loginRequired";

function MyOrders() {
  useEffect(() => {
    loginRequired();
  }, []);

  return <div>MyOrders</div>;
}

export default MyOrders;
