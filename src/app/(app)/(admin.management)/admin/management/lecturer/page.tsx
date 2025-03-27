"use client";
import CommonSearch from "@/components/Common/CommonSearch";
import CommonButton from "@/components/Common/CommonButton";
import {Plus} from "lucide-react";
import {SyncLoader} from "react-spinners";
import CourseRow from "@/components/Row/CourseRow";
import CommonPagination from "@/components/Pagination/CommonPagination";
import CourseClassContainer from "@/components/Admin/Course/CourseClassContainer";
import {useState} from "react";
import {useDevice} from "@/app/hooks/useDevice";

export default function AdminManagementLecturerPage() {
    const [loading, setLoading] = useState<boolean>(true); // 🔹 Thêm state loading
    const [search, setSearch] = useState<string | null>(null);
    const { isMobile } = useDevice();
    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            {/* Course List */}
            <div className={`bg-white p-2 rounded-lg shadow border border-secondary ${isMobile ? "w-full" : "w-1/3"}`}>
                <div className={`flex flex-row gap-2 p-2 justify-between items-center`}>
                    <CommonSearch
                        key={'search_course'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        // onSubmit={handleSubmit}
                    />
                    <CommonButton onClick={() => console.log("Thêm học phần")} icon={Plus} label="Thêm học phần" />
                </div>

                <div className={`p-2`}>
                    <div className={`border border-secondary p-2 rounded-md gap-2`}>
                        {/*{loading ? (*/}
                        {/*    <div className={`items-center justify-items-center`}>*/}
                        {/*        <SyncLoader color={`gray`} size={8} margin={4} speedMultiplier={0.6} />*/}
                        {/*    </div>*/}
                        {/*) : courses?.data ? (*/}
                        {/*    <div>*/}
                        {/*        {*/}
                        {/*            courses.data.map((course) => (*/}
                        {/*                <div key={course.id} className={`py-1`}>*/}
                        {/*                    <CourseRow*/}
                        {/*                        course={course}*/}
                        {/*                        selected={selectedCourse?.id === course.id}*/}
                        {/*                        onSelect={() => setSelectedCourse(course)}*/}
                        {/*                    />*/}
                        {/*                </div>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*        <CommonPagination meta={courses.meta} onPageChange={fetchCourses} />*/}
                        {/*    </div>*/}

                        {/*) : (*/}
                        {/*    <p className="text-center text-gray-500">Không có dữ liệu.</p> // 🔹 Thông báo khi không có dữ liệu*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>

            {/* Course Class List */}
            {/*<div className={`bg-white p-2 rounded-lg shadow flex border border-secondary ${isMobile ? "w-full" : "flex-grow"}`}>*/}
            {/*    <CourseClassContainer parentCourse={selectedCourse ? selectedCourse : null} />*/}
            {/*</div>*/}
        </div>
    );
}