import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/api/login", { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        toast.success("Đăng nhập thành công!");
      })
      .catch((error) => toast.error("Lỗi đăng nhập!"));
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
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

export default Login;
