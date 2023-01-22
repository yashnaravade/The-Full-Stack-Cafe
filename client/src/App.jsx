import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import BookTable from "./views/BookTable/BookTable";
import MyOrders from "./views/MyOrders/MyOrders";
import MyCart from "./views/MyCart/MyCart";

function App() {
  return (  
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/bookTable" element={<BookTable/>} />
          <Route path="/myOrders" element={<MyOrders/>} />
          <Route path="/myCart" element={<MyCart/>} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
