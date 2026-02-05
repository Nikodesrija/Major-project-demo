import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot base URL
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
