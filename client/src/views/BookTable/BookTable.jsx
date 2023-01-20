import React from "react";
import "./BookTable.css";
import { useEffect } from "react";
import { loginRequired } from "../../util/loginRequired";

function BookTable() {
  useEffect(() => {
    loginRequired();
  }, []);

  return <div>Book your Table baby!</div>;
}

export default BookTable;
