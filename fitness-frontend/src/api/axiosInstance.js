import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fitnessapplication-n1uh.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
