"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/AxiosInstance";
import {User} from "@/types/User";

interface Submission {
    id: number;
    source_code: string;
    language: string;
    status: string;
    execution_time: number | null;
    memory_used: number | null;
    output: string | null;
    created_at: string;
    user_id: number;
    user: User;
}

interface Props {
    exerciseId: number;
    courseClassId: number;
}

export default function SubmissionList({ exerciseId, courseClassId }: Props) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!exerciseId || !courseClassId) return;

        const fetchSubmissions = async () => {
            setLoading(true);
            try {
                const res: any = await api.get("/admin/submission", {
                    params: {
                        exercise_id: exerciseId,
                        course_class_id: courseClassId,
                    },
                });
                setSubmissions(res.data.submissions || []);
            } catch (error) {
                console.error("Failed to fetch submissions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [exerciseId, courseClassId]);

    const toggleExpand = (id: number) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    if (loading) return <p>Đang tải danh sách bài nộp...</p>;
    if (!submissions.length) return <p>Chưa có bài nộp nào.</p>;

    return (
        <div className="space-y-4 mt-4">
            {submissions.map((sub) => (
                <div key={sub.id} className="border p-4 rounded-lg shadow-sm">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleExpand(sub.id)}
                    >
                        <div>
                            <span className="text-sm text-gray-600">
                                {new Date(sub.created_at).toLocaleString()}
                            </span>
                            <span className="ml-2 text-sm font-medium">
                                - {sub.user.name || "Không xác định"}
                            </span>
                        </div>
                        <span
                            className={`text-sm px-2 py-1 rounded ${
                                sub.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {sub.status}
                        </span>
                    </div>

                    {expanded[sub.id] && (
                        <div className="mt-2">
                            <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap break-words">
                                {sub.source_code}
                            </pre>
                            <div className="text-sm text-gray-600 mt-2">
                                <p>⏱ Thời gian: {sub.execution_time ?? "-"}s</p>
                                <p>🧠 Bộ nhớ: {sub.memory_used ?? "-"} KB</p>
                                <p>💬 Output: {sub.output ?? "(Không có)"}</p>
                                <p>💡 Ngôn ngữ: {sub.language}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
