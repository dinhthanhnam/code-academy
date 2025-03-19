import ExerciseList from "@/components/Exercise/ExerciseList";

export default async function ExercisesPage({ params }) {
    const { slug } = await params; // ⬅️ Phải await params

    return (
        <>
            <ExerciseList></ExerciseList>
            <ExerciseList></ExerciseList>
        </>
    );
}
