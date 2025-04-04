"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useParams } from "next/navigation";
import { getCourseClass, getCourseClassExercises, getCourseClassStudents } from "@/utils/service/api/getCourseExercises";
import { PaginatedExercise } from "@/types/paginated/PaginatedExercise";
import Exercise from "@/types/Exercise";
import {Course} from "@/types/Course";
import {PaginatedUser} from "@/types/paginated/PaginatedUser";

// Define types
interface ClassContextType {
    exercises: PaginatedExercise;
    course: Course;
    students: PaginatedUser;
    loading: boolean;
    error: string | null;
    selectedExercise: Exercise;
    activeTab: string;
    setSelectedExercise: (exercise: any) => void;
    setActiveTab: (tab: string) => void;
}

interface ClassProviderProps {
    children: ReactNode;
}

// Create Context
const ClassContext = createContext<ClassContextType | undefined>(undefined);

// Context Provider
export default function ClassProvider({ children }: ClassProviderProps) {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const [exercises, setExercises] = useState<any>(null);
    const [course, setCourse] = useState<any>(null);
    const [students, setStudents] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<string>("details");

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) {
                setError("No class slug provided");
                setLoading(false);
                return;
            }

            try {
                const [exercisesRes, courseRes, studentsRes] = await Promise.all([
                    getCourseClassExercises(slug),
                    getCourseClass(slug),
                    getCourseClassStudents(slug),
                ]);

                setExercises(exercisesRes);
                setCourse(courseRes);
                setStudents(studentsRes);
            } catch (err) {
                setError("Failed to fetch class data");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const value = {
        exercises,
        course,
        students,
        loading,
        error,
        selectedExercise,
        activeTab,
        setSelectedExercise,
        setActiveTab,
    };

    return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
}

// Custom hook to use context
export function useClassContext() {
    const context = useContext(ClassContext);
    if (context === undefined) {
        throw new Error("useClassContext must be used within a ClassProvider");
    }
    return context;
}