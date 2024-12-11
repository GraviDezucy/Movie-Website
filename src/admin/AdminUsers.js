import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: localStorage.getItem("adminToken") },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (userId) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      axios
        .delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { Authorization: localStorage.getItem("adminToken") },
        })
        .then(() => {
          alert("Người dùng đã được xóa!");
          fetchUsers();
        })
        .catch((error) => alert("Có lỗi xảy ra khi xóa người dùng!"));
    }
  };

  return (
    <div>
      <h2>Quản Lý Người Dùng</h2>
      <input
        type="text"
        placeholder="Tìm kiếm người dùng..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Người Dùng</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => alert("Xóa người dùng")}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
