import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/signup" element={<h1>Sign Up</h1>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
