import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 🔥 غيرها بالـ backend url عندك

  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 تقدر تضيف Interceptors هنا

export default axiosInstance;
