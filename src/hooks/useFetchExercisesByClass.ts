// hooks/useCourseClassExercises.ts
import { useEffect, useState } from "react";
import Exercise from "@/types/Exercise";
import { getCourseClassExercises } from "@/utils/service/api/getCourseExercises";

export function useCourseClassExercises(slug: string) {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            try {
                const res = await getCourseClassExercises(slug);
                console.log("API Response:", res); // Kiểm tra dữ liệu trả về
                setExercises(res.data || []); // Đảm bảo luôn là mảng, kể cả khi không có data
            } catch (err) {
                console.error("Fetch error:", err); // Log lỗi nếu có
                setError(err);
                setExercises([]); // Đặt về mảng rỗng nếu lỗi
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchExercises();
    }, [slug]);

    return { exercises, loading, error };
}