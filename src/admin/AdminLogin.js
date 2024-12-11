import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/api/admin/login", { username, password })
      .then((response) => {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin");
      })
      .catch((error) => alert("Sai tên đăng nhập hoặc mật khẩu!"));
  };

  return (
    <div className="admin-login">
      <h2>Đăng Nhập Admin</h2>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng Nhập</button>
    </div>
  );
};

export default AdminLogin;
