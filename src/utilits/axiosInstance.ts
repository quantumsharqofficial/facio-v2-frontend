import axios, { type InternalAxiosRequestConfig } from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  // baseURL: "https://subhadental.quantumsharq.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
