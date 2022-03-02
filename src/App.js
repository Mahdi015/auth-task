import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import AddUsers from "./components/AddUsers/AddUsers";

export default function App() {
  const [token, settoken] = useState("");
  return (
    <>
      <ToastContainer />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm settoken={settoken} />} />
            <Route path="/admin" element={<AddUsers token={token} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
