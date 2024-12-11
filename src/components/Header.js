import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Netflix Clone</h1>
      <nav>
        <Link to="/">Trang Chủ</Link>
        <Link to="/watchlater">Xem Sau</Link>
        <Link to="/history">Lịch Sử</Link>
        <Link to="/login">Đăng Nhập</Link>
      </nav>
    </header>
  );
};

export default Header;
