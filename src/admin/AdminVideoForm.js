import React, { useState } from "react";
import axios from "axios";

const AdminVideoForm = ({ video = {}, onSave }) => {
  const [title, setTitle] = useState(video.title || "");
  const [description, setDescription] = useState(video.description || "");
  const [url, setUrl] = useState(video.url || "");
  const [category, setCategory] = useState(video.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = { title, description, url, category };
    const apiEndpoint = video._id
      ? `http://localhost:5000/api/admin/videos/${video._id}`
      : "http://localhost:5000/api/admin/videos";

    const method = video._id ? "put" : "post";

    axios[method](apiEndpoint, newVideo, {
      headers: { Authorization: localStorage.getItem("adminToken") },
    })
      .then(() => {
        alert(
          video._id ? "Cập nhật thành công!" : "Thêm video mới thành công!"
        );
        onSave();
      })
      .catch((error) => alert("Có lỗi xảy ra!"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{video._id ? "Chỉnh Sửa Video" : "Thêm Video Mới"}</h3>
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL Video"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Thể loại"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Lưu</button>
      <button type="button" onClick={() => onSave()}>
        Hủy
      </button>
    </form>
  );
};

export default AdminVideoForm;
