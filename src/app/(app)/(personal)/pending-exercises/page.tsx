import ExerciseList from "@/components/Exercise/ExerciseList";
import CustomAceEditor from "@/components/CodeEditor/CustomAceEditor";

export default async function PendingExercisesPage({ params }) {

    return (
        <>
            <ExerciseList></ExerciseList>

            <CustomAceEditor
                language="java"
            />
        </>
    );
}