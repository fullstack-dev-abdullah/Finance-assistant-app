import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem("token");
      window.location.href = "/login";
    }else if (error.response && error.response.status === 500) {
        // Handle server error
        console.error("Server error, please try again later.");
        }
        else if (error.code === "ECONNABORTED") {
            // Handle timeout error
            console.error("Request timed out, please try again.");
        }
    return Promise.reject(error);
  }
);

export default axiosInstance;