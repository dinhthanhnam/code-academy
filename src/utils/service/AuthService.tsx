import api from "@/utils/AxiosInstance";

// Định nghĩa kiểu cho payload của AuthenticateUser (đăng nhập)
interface LoginPayload {
    email: string;
    password: string;
}

// Định nghĩa kiểu cho payload của RegisterUser (đăng ký)
interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// Định nghĩa kiểu cho dữ liệu trả về từ API (giả định)
interface AuthResponse {
    message: string; // Thông điệp từ server
    success: boolean;
}

// Hàm khởi tạo CSRF token
export const initializeCsrfToken = async (): Promise<void> => {
    await api.get("/sanctum/csrf-cookie");
};

// Hàm xác thực người dùng (đăng nhập)
export const AuthenticateUser = async (payload: LoginPayload): Promise<AuthResponse> => {
    await initializeCsrfToken();
    const res = await api.post<AuthResponse>("/login", payload);
    return res.data;
};

// Hàm đăng ký người dùng
export const RegisterUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
    await initializeCsrfToken();
    const res = await api.post<AuthResponse>("/register", payload);
    return res.data;
};

// Hàm đăng xuất người dùng
export const LogoutUser = async (): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/logout");
    return res.data;
};