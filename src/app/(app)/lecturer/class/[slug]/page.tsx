import { notFound } from 'next/navigation';
import {getCourseClass, getCourseClassExercises, getCourseClassStudents} from "@/utils/service/api/getCourseExercises";
import LecturerClassDetail from "@/components/ClassDetail/LecturerClassDetail";

export default async function LecturerClassDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    try {
        // Await params để lấy slug
        const { slug } = await params;

        // Sử dụng Promise.all để gọi đồng thời các API
        const [exercises, course, students] = await Promise.all([
            getCourseClassExercises(slug),
            getCourseClass(slug),
            getCourseClassStudents(slug),
        ]);

        // Kiểm tra dữ liệu trả về từ các API
        if (!exercises?.data || !course || !students?.data) {
            notFound();
        }

        // Trả về component với dữ liệu
        return <LecturerClassDetail exercises={exercises} courseClass={course} students={students} />;
    } catch (error) {
        console.error('Error fetching data:', error);
        notFound();
    }
}