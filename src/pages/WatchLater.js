import React, { useState, useEffect } from "react";
import VideoList from "../components/VideoList";
import axios from "axios";

const WatchLater = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/USER_ID/watchlater", {
        headers: { Authorization: "TOKEN" },
      })
      .then((response) => {
        setVideos(response.data || []); // Đảm bảo mảng
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Danh Sách Xem Sau</h2>
      {loading ? <p>Đang tải...</p> : <VideoList videos={videos} />}
    </div>
  );
};

export default WatchLater;
