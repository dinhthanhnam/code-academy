import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true, // Gửi HTTP-Only Cookies cùng request
    headers: { "Content-Type": "application/json" },
});

// 🔹 Xử lý lỗi 401 (Chuyển hướng về authenticateUser)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("Chưa xác thực, vui lòng đăng nhập...");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
