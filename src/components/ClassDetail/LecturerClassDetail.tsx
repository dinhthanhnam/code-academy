"use client";

import { CourseClass } from "@/types/CourseClass";
import Exercise from "@/types/Exercise";
import {User} from "@/types/User";
import {PaginatedExercise} from "@/types/paginated/PaginatedExercise";
import {PaginatedUser} from "@/types/paginated/PaginatedUser";

interface LecturerClassDetail {
    courseClass?: CourseClass;
    exercises?: PaginatedExercise;
    students?: PaginatedUser;
}

export default function LecturerClassDetail({courseClass, exercises, students }: LecturerClassDetail) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">{courseClass?.name}</h1>
            <p className="text-gray-500">Mã lớp: {courseClass?.course_class_code}</p>
            <p className="text-gray-500">Mô tả: {courseClass?.description}</p>
        </div>
    );
}