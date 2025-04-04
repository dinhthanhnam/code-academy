"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useParams } from "next/navigation";
import { getCourseClass, getCourseClassExercises, getCourseClassStudents } from "@/utils/service/api/getCourseExercises";
import {PaginatedExercise} from "@/types/paginated/PaginatedExercise";

// Define types
interface ClassContextType {
    exercises: PaginatedExercise;
    course: any;
    students: any;
    loading: boolean;
    error: string | null;
    selectedExercise: any;
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
function ClassProvider({ children }: ClassProviderProps) {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const [exercises, setExercises] = useState<any>(null);
    const [course, setCourse] = useState<any>(null);
    const [students, setStudents] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<any>(null);
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
function useClassContext() {
    const context = useContext(ClassContext);
    if (context === undefined) {
        throw new Error("useClassContext must be used within a ClassProvider");
    }
    return context;
}

// Main Component
export default function LecturerClassDetailPage() {
    return (
        <ClassProvider>
            <ClassLayout />
        </ClassProvider>
    );
}

// Layout Component
function ClassLayout() {
    const { loading, error, course } = useClassContext();

    if (loading) return <div className="h-full flex items-center justify-center">Đang tải dữ liệu...</div>;
    if (error) return <div className="h-full flex items-center justify-center">{error}</div>;
    if (!course) return <div className="h-full flex items-center justify-center">Không tìm thấy lớp cho giảng viên</div>;

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            <div className="bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-primary">{course?.name}</h1>
                <p className="text-gray-500">Mã lớp: {course?.course_class_code}</p>
                <p className="text-gray-500">Mô tả: {course?.description}</p>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/2 bg-white border-r">
                    <ExerciseList />
                </div>
                <div className="w-1/2 flex">
                    <VerticalTabs />
                    <TabContent />
                </div>
            </div>
        </div>
    );
}

// Exercise List Component
function ExerciseList() {
    const { exercises, selectedExercise, setSelectedExercise } = useClassContext();

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="p-6 flex flex-row justify-between border-b">
                <h2 className="text-xl font-bold text-gray-800">Danh sách bài tập</h2>
                <div className="flex gap-3">
                    {/*<button*/}
                    {/*    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${*/}
                    {/*        filter === "All" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"*/}
                    {/*    }`}*/}
                    {/*    onClick={() => setFilter("All")}*/}
                    {/*>*/}
                    {/*    Tất cả*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${*/}
                    {/*        filter === "Easy" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"*/}
                    {/*    }`}*/}
                    {/*    onClick={() => setFilter("Easy")}*/}
                    {/*>*/}
                    {/*    Dễ*/}
                    {/*</button>*/}
                </div>
            </div>

            <div className="flex flex-row p-4 bg-gray-200 font-bold text-gray-800 border-b">
                <div className="w-1/12 text-center">Trạng thái</div>
                <div className="w-4/12 text-center">Tiêu đề</div>
                <div className="w-2/12 text-center">Độ khó</div>
                <div className="w-3/12 text-center">Dạng bài</div>
                <div className="w-2/12 text-center">Hạn nộp</div>
            </div>

            <div className="flex-1 overflow-auto">
                {exercises?.data?.map((exercise: any) => (
                    <div
                        key={exercise.id}
                        className={`flex flex-row p-4 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedExercise?.id === exercise.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedExercise(exercise)}
                    >
                        <div className="w-1/12 text-center">{exercise.status}</div>
                        <div className="w-4/12">{exercise.title}</div>
                        <div className="w-2/12 text-center">{exercise.difficulty}</div>
                        <div className="w-3/12 text-center">{exercise.type}</div>
                        <div className="w-2/12 text-center">{exercise.deadline}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Vertical Tabs Component
function VerticalTabs() {
    const { activeTab, setActiveTab } = useClassContext();

    return (
        <div className="w-16 bg-gray-100 flex flex-col items-center py-4 gap-4 border-r">
            <button
                className={`w-12 h-12 flex items-center justify-center rounded-md ${
                    activeTab === "editor" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("editor")}
                title="Mở Code Editor"
            >
                <span className="text-xl">📝</span>
            </button>
            <button
                className={`w-12 h-12 flex items-center justify-center rounded-md ${
                    activeTab === "submissions" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("submissions")}
                title="Xem nội dung nộp bài"
            >
                <span className="text-xl">📤</span>
            </button>
            <button
                className={`w-12 h-12 flex items-center justify-center rounded-md ${
                    activeTab === "students" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("students")}
                title="Xem danh sách sinh viên"
            >
                <span className="text-xl">👥</span>
            </button>
            <button
                className={`w-12 h-12 flex items-center justify-center rounded-md ${
                    activeTab === "exerciseStudents" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("exerciseStudents")}
                title="Xem sinh viên nộp bài này"
            >
                <span className="text-xl">📊</span>
            </button>
        </div>
    );
}

// Tab Content Component
function TabContent() {
    const { activeTab, selectedExercise } = useClassContext();

    return (
        <div className="flex-1 p-6 overflow-auto">
            {activeTab === "editor" && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Code Editor</h2>
                    <p>{selectedExercise ? "Code editor cho: " + selectedExercise.title : "Chọn bài tập để mở editor"}</p>
                </div>
            )}
            {activeTab === "submissions" && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Nội dung nộp bài</h2>
                    <p>{selectedExercise ? "Bài nộp cho: " + selectedExercise.title : "Chọn bài tập để xem bài nộp"}</p>
                </div>
            )}
            {activeTab === "students" && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Danh sách sinh viên</h2>
                    <p>Danh sách tất cả sinh viên trong lớp</p>
                </div>
            )}
            {activeTab === "exerciseStudents" && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        {selectedExercise ? "Sinh viên nộp bài này" : "Tất cả nội dung nộp"}
                    </h2>
                    <p>{selectedExercise ? "Danh sách sinh viên nộp bài: " + selectedExercise.title : "Tất cả bài nộp trong lớp"}</p>
                </div>
            )}
        </div>
    );
}