"use client"; // Đảm bảo chạy phía client vì window không tồn tại trên server

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDeviceType } from "@/app/redux/slices/deviceSlice";

export default function DeviceDetector() {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkDevice = () => {
            dispatch(setDeviceType(window.innerWidth < 768));
        };

        checkDevice(); // Kiểm tra khi load trang
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, [dispatch]);

    return null; // Không render gì cả, chỉ chạy logic
}
