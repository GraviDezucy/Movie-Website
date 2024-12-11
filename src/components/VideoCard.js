import React from "react";
import "./VideoCard.css";
import { motion } from "framer-motion";

const VideoCard = ({ video, onRate, onWatchLater, loading }) => {
  if (loading) {
    return (
      <div className="video-card">
        <div className="skeleton skeleton-video"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-description"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="video-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <video src={video.url} controls width="300"></video>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
      <div className="actions">
        <button onClick={() => onRate(video._id)}>Đánh Giá</button>
        <button onClick={() => onWatchLater(video._id)}>Xem Sau</button>
      </div>
    </motion.div>
  );
};

export default VideoCard;
