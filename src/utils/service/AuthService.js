import api from "@/utils/AxiosInstance";

// // Lấy token từ cookie (client-side)
// const getToken = () => {
//     if (typeof window === "undefined") return null;
//     return document.cookie
//         .split("; ")
//         .find(row => row.startsWith("token="))
//         ?.split("=")[1];
// };

export const AuthenticateUser = async (payload) => {
    const res = await api.post("/login", payload);
    return res.data;
};

export const RegisterUser = async (payload) => {
    const res = await api.post("/register", payload);
    return res.data;
};

export const LogoutUser = async () => {
    const res = await api.post("/logout");
    return res.data;
};