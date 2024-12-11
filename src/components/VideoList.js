import React from "react";
import VideoCard from "./VideoCard";
import "./VideoList.css";

const VideoList = ({ videos }) => {
  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <div className="empty-message">
        <p>Hiện tại không có nội dung nào để hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
