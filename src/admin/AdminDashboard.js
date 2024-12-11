import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ userCount: 0, videoCount: 0 });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: localStorage.getItem("adminToken") },
      })
      .then((response) => setStats(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Bảng Điều Khiển Admin</h2>
      <p>Tổng số người dùng: {stats.userCount}</p>
      <p>Tổng số video: {stats.videoCount}</p>
    </div>
  );
};

export default AdminDashboard;
