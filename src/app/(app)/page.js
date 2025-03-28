import CourseList from "@/components/CourseList/CourseList";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import RankingBoard from "@/components/Ranking/RankingBoard";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex justify-center min-h-screen p-5">
            <div className="flex gap-8 w-full">
                {/* Cột bên trái */}
                <div className="flex-1">
                    <PendingExerciseList />
                </div>
                
                {/* Cột bên phải */}
                <div className="flex-1 flex flex-col gap-5">
                    <div className="h-100 overflow-auto">
                        <RankingBoard />
                    </div>
                    <div className="h-100 overflow-auto">
                        <CourseList />
                    </div>
                </div>
            </div>
        </div>
    );
}