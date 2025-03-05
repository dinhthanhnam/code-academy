import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:8000
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor để thêm Bearer Token
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

// Interceptor cho response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;