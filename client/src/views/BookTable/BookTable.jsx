import React from "react";
import "./BookTable.css";
import { useState } from "react";
import { loginRequired } from "../../util/loginRequired";
import { CurrentUser } from "../../util/CurrentUser";
import { useEffect } from "react";

function BookTable() {
  const [currentUserVar, setCurrentUser] = useState(CurrentUser);

  useEffect(() => {
    if (!CurrentUser) {
      loginRequired();
    }
  }, currentUserVar);

  return <div>Book your Table baby!</div>;
}

export default BookTable;
