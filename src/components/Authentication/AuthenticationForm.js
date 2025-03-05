"use client";
import { useState } from "react";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/components/Form/FormContainer";
import CommonButton from "@/components/Common/CommonButton";
import { AuthenticateUser, RegisterUser } from "@/utils/service/AuthService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/app/redux/slices/loadingSlice";
import Link from "next/link";

export default function AuthenticationForm({ type }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [payload, setPayload] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState({
        message: "",
        status: false,
    });

    // Hàm xử lý đăng nhập
    const handleLogin = async () => {
        if (!payload.email || !payload.password) {
            setMessage({ message: "Vui lòng nhập email và mật khẩu!", status: false });
            return;
        }

        try {
            dispatch(startLoading());
            await AuthenticateUser({ email: payload.email, password: payload.password });
            setMessage({ message: "Đăng nhập thành công!", status: true });
            setTimeout(() => {
                dispatch(stopLoading());
                router.push("/");
            }, 1500);
        } catch (error) {
            console.log(error.message);
            setMessage({message: "Đăng nhập thất bại!", status: false });
            dispatch(stopLoading());
        }
    };

    // Hàm xử lý đăng ký
    const handleRegister = async () => {
        if (!payload.name || !payload.email || !payload.password || !payload.password_confirmation) {
            setMessage({ message: "Vui lòng nhập đầy đủ thông tin!", status: false });
            return;
        }

        if (payload.password !== payload.password_confirmation) {
            setMessage({ message: "Mật khẩu không khớp!", status: false });
            return;
        }

        try {
            dispatch(startLoading());
            const registerRequest = await RegisterUser({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,
            });
            if(registerRequest) {
                setMessage({ message: "Đăng ký thất bại!", status: true });
            }
            setMessage({ message: "Đăng ký thành công! Chuyển hướng...", status: true });
            setTimeout(() => {
                dispatch(stopLoading());
                router.push("/login"); // Redirect về /login thay vì / để người dùng đăng nhập sau khi đăng ký
            }, 1500);
        } catch (error) {
            setMessage({ message: "Đăng ký thất bại!", status: false });
            dispatch(stopLoading());
        }
    };

    // Hàm submit tổng quát
    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "login") {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    return (
        <div>
            <FormContainer>
        <span className="mx-auto font-black text-2xl p-2">
          {type === "login" ? "Đăng nhập" : "Đăng ký"}
        </span>

                {/* Hiển thị thông báo */}
                {message.message && (
                    <div
                        className={`p-3 mx-auto rounded-full transition-all duration-300 ease-in-out transform ${
                            message.status
                                ? "bg-green-200 text-green-800 opacity-100 translate-y-0"
                                : "bg-red-200 text-red-800 opacity-100 translate-y-0"
                        }`}
                    >
                        {message.message}
                    </div>
                )}

                {/* Trường nhập tên (Chỉ hiển thị khi đăng ký) */}
                {type === "register" && (
                    <FormInput
                        type="text"
                        label="Tên của bạn"
                        name="name"
                        onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                    />
                )}

                <FormInput
                    type="email"
                    label="Email"
                    name="email"
                    onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                />
                <FormInput
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                />

                {/* Trường nhập lại mật khẩu (Chỉ hiển thị khi đăng ký) */}
                {type === "register" && (
                    <FormInput
                        type="password"
                        label="Xác nhận mật khẩu"
                        name="password_confirmation"
                        onChange={(e) => setPayload({ ...payload, password_confirmation: e.target.value })}
                    />
                )}

                <div className="flex justify-between p-2 items-center">
                    <Link href={type === "login" ? "/register" : "/login"}>
            <span className="font-normal text-secondary2 hover:text-secondary underline duration-100 select-none cursor-pointer">
              {type === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            </span>
                    </Link>
                    <CommonButton label="Xác nhận" onClick={handleSubmit} />
                </div>
            </FormContainer>
        </div>
    );
}