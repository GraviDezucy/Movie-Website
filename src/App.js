import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import History from "./pages/History";
import Login from "./pages/Login";
import "./App.css";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";

const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
