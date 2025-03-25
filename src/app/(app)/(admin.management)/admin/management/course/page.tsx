"use client";
import ManagementContainer from "@/components/Admin/Management/ManagementContainer";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye
} from 'lucide-react';
import {useState} from "react";
import CommonButton2 from "@/components/Common/CommonButton2";
interface Course {
    id: number;
    name: string;
    code: string;
    credits: number;
    description: string;
}

export default function AdminManagementCoursePage() {
    const [courses, setCourses] = useState<Course[]>([
        {
            id: 1,
            name: 'Introduction to Programming',
            code: 'CS101',
            credits: 3,
            description: 'Basic programming concepts and algorithms'
        },
        {
            id: 2,
            name: 'Data Structures',
            code: 'CS201',
            credits: 4,
            description: 'Advanced data structure implementation'
        }
    ]);

    // Search state
    const [searchTerm, setSearchTerm] = useState('');

    // Filter courses based on search term
    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create new course (modal placeholder)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState<Partial<Course>>({});

    // Edit course (modal placeholder)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    // Handler for creating a new course
    const handleCreateCourse = () => {
        if (newCourse.name && newCourse.code) {
            const courseToAdd = {
                ...newCourse,
                id: courses.length + 1
            } as Course;
            setCourses([...courses, courseToAdd]);
            setIsCreateModalOpen(false);
            setNewCourse({});
        }
    };

    // Handler for updating an existing course
    const handleUpdateCourse = () => {
        if (editingCourse) {
            setCourses(courses.map(course =>
                course.id === editingCourse.id ? editingCourse : course
            ));
            setIsEditModalOpen(false);
            setEditingCourse(null);
        }
    };

    // Handler for deleting a course
    const handleDeleteCourse = (courseId: number) => {
        setCourses(courses.filter(course => course.id !== courseId));
    };
    return (
        <div className={`flex flex-grow`}>
            <ManagementContainer>
                <div className="p-4 bg-white rounded-lg">
                    {/* Search and Create Section */}
                    <div className="flex justify-between mb-4">
                        <div className="relative flex-grow mr-4">
                            <input
                                type="text"
                                placeholder="Search courses by name or code"
                                className="w-full p-2 pl-8 border rounded"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search
                                className="absolute left-2 top-3 text-gray-400"
                                size={18}
                            />
                        </div>
                        <CommonButton2
                            onClick={() => setIsCreateModalOpen(true)}
                            icon={Plus}
                            label={"Thêm học phần"}
                        />
                    </div>

                    {/* Course List */}
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border text-left">ID</th>
                            <th className="p-2 border text-left">Name</th>
                            <th className="p-2 border text-left">Code</th>
                            <th className="p-2 border text-left">Credits</th>
                            <th className="p-2 border text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCourses.map(course => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="p-2 border">{course.id}</td>
                                <td className="p-2 border">{course.name}</td>
                                <td className="p-2 border">{course.code}</td>
                                <td className="p-2 border">{course.credits}</td>
                                <td className="p-2 border">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingCourse(course);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Create Course Modal (Basic Structure) */}
                    {isCreateModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl mb-4">Create New Course</h2>
                                <input
                                    type="text"
                                    placeholder="Course Name"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newCourse.name || ''}
                                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                                />
                                <input
                                    type="text"
                                    placeholder="Course Code"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newCourse.code || ''}
                                    onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                                />
                                <input
                                    type="number"
                                    placeholder="Credits"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newCourse.credits || ''}
                                    onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value)})}
                                />
                                <textarea
                                    placeholder="Course Description"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newCourse.description || ''}
                                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="bg-gray-300 text-black px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateCourse}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Course Modal (Similar Structure to Create Modal) */}
                    {isEditModalOpen && editingCourse && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl mb-4">Edit Course</h2>
                                <input
                                    type="text"
                                    placeholder="Course Name"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={editingCourse.name}
                                    onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})}
                                />
                                <input
                                    type="text"
                                    placeholder="Course Code"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={editingCourse.code}
                                    onChange={(e) => setEditingCourse({...editingCourse, code: e.target.value})}
                                />
                                <input
                                    type="number"
                                    placeholder="Credits"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={editingCourse.credits}
                                    onChange={(e) => setEditingCourse({...editingCourse, credits: parseInt(e.target.value)})}
                                />
                                <textarea
                                    placeholder="Course Description"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={editingCourse.description}
                                    onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="bg-gray-300 text-black px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateCourse}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ManagementContainer>
        </div>
    );
}