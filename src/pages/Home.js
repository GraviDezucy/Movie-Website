import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoList from "../components/VideoList";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchVideos = () => {
    if (!hasMore) return; // Không gọi nếu đã hết dữ liệu

    axios
      .get(`http://localhost:5000/api/videos?page=${page}&limit=10`)
      .then((response) => {
        setVideos((prev) => [...prev, ...(response.data.videos || [])]);
        setPage(page + 1);
        setHasMore(response.data.hasMore);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []); // Dependency array rỗng để chỉ chạy 1 lần khi component mount

  return (
    <div>
      <h2>Trang Chủ</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchVideos}
          hasMore={hasMore}
          loader={<p>Đang tải thêm...</p>}
        >
          <VideoList videos={videos} />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Home;
