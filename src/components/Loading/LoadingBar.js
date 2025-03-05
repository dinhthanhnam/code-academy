"use client";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function LoadingBar() {
    const isLoading = useSelector((state) => state.loading.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-50 overflow-hidden">
            <LinearProgress />
        </div>
    );
}
