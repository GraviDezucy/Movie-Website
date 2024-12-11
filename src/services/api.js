import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getVideos = (page, limit) => {
  return axios.get(`${API_BASE_URL}/videos?page=${page}&limit=${limit}`);
};

export const getVideoById = (videoId) => {
  return axios.get(`${API_BASE_URL}/videos/${videoId}`);
};

export const getSimilarVideos = (videoId) => {
  return axios.get(`${API_BASE_URL}/videos/${videoId}/similar`);
};

export const addToWatchLater = (userId, videoId, token) => {
  return axios.post(
    `${API_BASE_URL}/users/${userId}/watchlater`,
    { videoId },
    {
      headers: { Authorization: token },
    }
  );
};

export const getWatchLater = (userId, token) => {
  return axios.get(`${API_BASE_URL}/users/${userId}/watchlater`, {
    headers: { Authorization: token },
  });
};

export const addToHistory = (userId, videoId, token) => {
  return axios.post(
    `${API_BASE_URL}/users/${userId}/history`,
    { videoId },
    {
      headers: { Authorization: token },
    }
  );
};

export const getHistory = (userId, token) => {
  return axios.get(`${API_BASE_URL}/users/${userId}/history`, {
    headers: { Authorization: token },
  });
};
