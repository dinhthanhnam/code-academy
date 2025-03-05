import api from "@/utils/AxiosInstance";

export const AuthenticateUser = async (payload) => {
    try {
        const res = await api.post("/login", payload);
        console.log(res.data.message);
        return res.data;
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        throw error;
    }
};

export const RegisterUser = async (payload) => {
    try {
        const res = await api.post("/register", payload);
        console.log(res.data.message);
        return res.data;
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        throw error;
    }
};

export const LogoutUser = async (payload) => {

}
