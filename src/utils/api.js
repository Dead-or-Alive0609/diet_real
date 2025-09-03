import axios from "axios";

const api = axios.create({
  baseURL: "https://dietha.site/api", // 공통 prefix
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰이 있으면 자동으로 헤더에 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
