
import { getCourseExercises } from "@/utils/service/api/getCourseExercises";
import { notFound } from "next/navigation";
import LecturerClassDetail from "@/components/ClassDetail/LecturerClassDetail";

export default async function LecturerClassDetailPage({ params }: { params: { slug: string } }) {
    try {
        const courseClass = await getCourseExercises(params.slug);

        if (!courseClass) {
            notFound();
        }

        return <LecturerClassDetail courseClass={courseClass} />;
    } catch (error) {
        notFound();
    }
}