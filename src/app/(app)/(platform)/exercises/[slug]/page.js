import ExerciseList from "@/components/Exercise/ExerciseList";
import CustomAceEditor from "@/components/CodeEditor/CustomAceEditor";

export default async function ExercisesPage({ params }) {
    const { slug } = await params; // ⬅️ Phải await params

    return (
        <>
            <ExerciseList></ExerciseList>

            <CustomAceEditor
                defaultValue={'console.log("Xin chào Next.js với Ace Editor!");'}
                language="javascript"
                height="100%" // Chiếm toàn bộ chiều cao của div cha
            />
        </>
    );
}
