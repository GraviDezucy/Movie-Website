import React, { useState, useEffect } from "react";
import VideoList from "../components/VideoList";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoDetail = () => {
  const { videoId } = useParams(); // Lấy ID video từ URL
  const [video, setVideo] = useState(null);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy chi tiết video
    axios
      .get(`http://localhost:5000/api/videos/${videoId}`)
      .then((response) => {
        setVideo(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    // Lấy danh sách video tương tự
    axios
      .get(`http://localhost:5000/api/videos/${videoId}/similar`)
      .then((response) => setSimilarVideos(response.data))
      .catch((error) => console.log(error));
  }, [videoId]);

  const handleRate = (rating) => {
    axios
      .post(
        `http://localhost:5000/api/videos/${videoId}/rate`,
        { rating },
        {
          headers: { Authorization: "TOKEN" },
        }
      )
      .then(() => alert("Cảm ơn bạn đã đánh giá!"))
      .catch((error) => console.log(error));
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <h2>{video.title}</h2>
      <video src={video.url} controls width="600"></video>
      <p>{video.description}</p>
      <div>
        <h3>Đánh Giá:</h3>
        <button onClick={() => handleRate(1)}>1 Sao</button>
        <button onClick={() => handleRate(2)}>2 Sao</button>
        <button onClick={() => handleRate(3)}>3 Sao</button>
        <button onClick={() => handleRate(4)}>4 Sao</button>
        <button onClick={() => handleRate(5)}>5 Sao</button>
      </div>
      <div>
        <h3>Video Tương Tự</h3>
        <VideoList videos={similarVideos} />
      </div>
    </div>
  );
};

export default VideoDetail;
