import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminVideoForm from "./AdminVideoForm";

const AdminVideos = () => {
  const [videos, setVideos] = useState([]); // Danh sách video
  const [editingVideo, setEditingVideo] = useState(null); // Video đang chỉnh sửa
  const [search, setSearch] = useState(""); // Tìm kiếm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Fetch dữ liệu video
  const fetchVideos = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/admin/videos", {
        headers: { Authorization: localStorage.getItem("adminToken") },
      })
      .then((response) => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Lọc video theo tìm kiếm
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  // Xử lý xóa video
  const handleDelete = (videoId) => {
    if (window.confirm("Bạn có chắc muốn xóa video này?")) {
      axios
        .delete(`http://localhost:5000/api/admin/videos/${videoId}`, {
          headers: { Authorization: localStorage.getItem("adminToken") },
        })
        .then(() => {
          alert("Video đã được xóa!");
          fetchVideos();
        })
        .catch((error) => alert("Có lỗi xảy ra khi xóa video!"));
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Quản Lý Video</h2>

      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm video..."
        value={search}
        onChange={handleSearch}
      />

      {editingVideo ? (
        // Form chỉnh sửa hoặc thêm video
        <AdminVideoForm
          video={editingVideo}
          onSave={() => {
            setEditingVideo(null); // Đóng form
            fetchVideos(); // Refresh danh sách video
          }}
        />
      ) : (
        <>
          {/* Nút thêm video */}
          <button onClick={() => setEditingVideo({})}>Thêm Video Mới</button>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tiêu Đề</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((video) => (
                  <tr key={video._id}>
                    <td>{video._id}</td>
                    <td>{video.title}</td>
                    <td>
                      <button onClick={() => setEditingVideo(video)}>
                        Chỉnh Sửa
                      </button>
                      <button onClick={() => handleDelete(video._id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AdminVideos;
