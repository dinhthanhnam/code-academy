"use client";

import { CourseClass } from "@/types/CourseClass";

export default function LecturerClassDetail({ courseClass }: { courseClass: CourseClass }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">{courseClass.name}</h1>
            <p className="text-gray-500">Mã lớp: {courseClass.course_class_code}</p>
            <p className="text-gray-500">Mô tả: {courseClass.description}</p>
        </div>
    );
}