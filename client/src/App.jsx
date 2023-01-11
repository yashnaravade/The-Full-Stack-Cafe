import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/signup" element={<h1>Sign Up</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
