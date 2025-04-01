"use client";
import CourseList from "@/components/CourseList/CourseList";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import RankingBoard from "@/components/Ranking/RankingBoard";
import { useDevice } from "@/hooks/useDevice";
import { useRole } from "@/hooks/useAuth";

export default function Home() {
    const { isMobile } = useDevice();
    const { isStudent } = useRole();

    return isStudent ? (
        <div className="flex justify-center min-h-screen p-2">
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2 w-full`}>
                {/* Cột bên trái */}
                <div className="flex-1">
                    <PendingExerciseList />
                </div>

                {/* Cột bên phải */}
                <div className="flex-1 flex flex-col gap-2">
                    <div className="h-100 overflow-auto">
                        <RankingBoard />
                    </div>
                    <div className="h-100 overflow-auto">
                        <CourseList />
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
