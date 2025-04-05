"use client";
import AceEditor from "react-ace";
import {useState, useEffect} from "react";
import Exercise from "@/types/Exercise";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import api from "@/utils/AxiosInstance";

interface AceEditorProps {
    language?: string;
    selectedExercise?: Exercise | null;
    courseClassId?: number | null;
}

export default function CustomAceEditor({
                                            selectedExercise,
                                            courseClassId,
                                        }: AceEditorProps) {
    const [value, setValue] = useState<string>(""); // Code hiện tại trong editor
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState(selectedExercise?.language || 'java');

    // Cập nhật code khi bài tập thay đổi
    useEffect(() => {
        if (selectedExercise?.language) {
            setSelectedLanguage(selectedExercise.language);
        }
        if (selectedExercise) {
            setValue(`// Viết code cho "${selectedExercise.title}"\n`);
        } else {
            setValue("");
        }
    }, [selectedExercise]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleSubmit = async () => {
        if (!value?.trim() || !selectedExercise) {
            setMessage({type: "error", text: "Thiếu thông tin để nộp bài."});
            return;
        }

        try {
            const res = await api.post("/api/submit", {
                code: value,
                language: selectedLanguage,
                exercise_id: selectedExercise.id,
                course_class_id: courseClassId,
                mode: "submit" // phân biệt với "compile"
            });
            setMessage({type: "success", text: "Đã nộp bài thành công!"});
        } catch (err: any) {
            console.error(err);
            setMessage({type: "error", text: "Gửi code thất bại."});
        }
    };

    const handleCompile = async () => {
        try {
            const res:any = await api.post("/api/submit", {
                code: value,
                language: selectedLanguage,
                exercise_id: selectedExercise.id,
                course_class_id: courseClassId,
                mode: "compile"
            });
            const output:any = res.data.stdout || res.data.stderr || "Không có output.";
            setMessage({ type: "success", text: `Kết quả:\n${output}` });
        } catch (err: any) {
            setMessage({ type: "error", text: "Lỗi khi compile code." });
        }
    };

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto p-4 pt-0 bg-[#272822] rounded-lg shadow-lg">
            {/* Header */}
            <div
                className="bg-[#272822] text-white p-3 rounded-t-md border-b border-gray-600 text-lg font-semibold flex flex-row justify-between">
                <p className="text-xl font-black items-center">
                    {selectedExercise ? selectedExercise.title : "Trình soạn thảo Code"}
                </p>
                <select
                    className="bg-[#272822] text-white p-1 rounded-md text-sm"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    <option value="java">Java</option>
                    <option value="c_cpp">C++</option>
                    <option value="python">Python</option>
                </select>
            </div>

            {/* Editor */}
            <div className="flex-1">
                {selectedExercise ? (
                    <AceEditor
                        mode={selectedLanguage}
                        theme="monokai"
                        value={value}
                        onChange={handleChange}
                        name="custom-ace-editor"
                        width="100%"
                        fontSize={14}
                        showPrintMargin={false}
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            showLineNumbers: true,
                            tabSize: 2,
                            enableBasicAutocompletion: true,
                        }}
                    />
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        Vui lòng chọn một bài tập để bắt đầu viết code.
                    </div>
                )}
            </div>

            {/* Thông báo */}
            {message && (
                <div
                    className={`mt-3 p-2 text-center rounded-md text-white font-medium ${
                        message.type === "error" ? "bg-red-600" : "bg-green-600"
                    }`}
                >
                    {message.text}
                </div>
            )}

            {/* Nút Submit */}
            {selectedExercise && (
                <div className="flex flex-row gap-5 justify-center">
                    <button
                        className="w-1/2 mt-4 bg-orange-600 hover:bg-[#75715E] text-white font-bold py-2 px-4 rounded-md transition-all"
                        onClick={handleCompile} // Thêm logic compile nếu cần
                    >
                        Compile Code
                    </button>
                    <button
                        className="w-1/2 mt-4 bg-[#75715E] hover:bg-[#A6E22E] text-white font-bold py-2 px-4 rounded-md transition-all"
                        onClick={handleSubmit}
                    >
                        Submit Code
                    </button>
                </div>
            )}
        </div>
    );
}