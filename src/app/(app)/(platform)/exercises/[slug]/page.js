import ProblemList from "@/components/Problem/ProblemList";

export default async function ExercisesPage({ params }) {
    const { slug } = await params; // ⬅️ Phải await params

    return (
        <>
            <ProblemList></ProblemList>
            <ProblemList></ProblemList>
        </>
    );
}
