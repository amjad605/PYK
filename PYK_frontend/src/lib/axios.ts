import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 🔥 غيرها بالـ backend url عندك
  withCredentials: true, // لو بتتعامل مع cookies/JWT
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 تقدر تضيف Interceptors هنا

export default axiosInstance;
