"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci"

const quizzes = [
    { id: 1, title: "Mathematics Quiz 1", subject: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "blue" },
    { id: 2, title: "Mathematics Quiz 2", subject: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "cyan" },
    { id: 3, title: "Physics Quiz 1", subject: "Physics", description: "Description...", instructor: "Rudi Wicaksono", color: "green" },
    { id: 4, title: "Chemistry Quiz 1", subject: "Chemistry", description: "Description...", instructor: "Rudi Wicaksono", color: "yellow" },
    { id: 5, title: "Biology Quiz 1", subject: "Biology", description: "Description...", instructor: "Rudi Wicaksono", color: "blue" },
    { id: 6, title: "English Quiz 1", subject: "English", description: "Description...", instructor: "Rudi Wicaksono", color: "cyan" },
    { id: 7, title: "History Quiz 1", subject: "History", description: "Description...", instructor: "Rudi Wicaksono", color: "green" },
    { id: 8, title: "Geography Quiz 1", subject: "Geography", description: "Description...", instructor: "Rudi Wicaksono", color: "yellow" },
];

export default function StudentQuizAvailable() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const colorMap: Record<string, string> = {
        blue: "border-blue-500",
        cyan: "border-cyan-500",
        green: "border-green-500",
        yellow: "border-yellow-500",
    };

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleQuizClick = (quizId: number, subject: string) => {
        router.push(`/student/quiz-available/${quizId}?subject=${encodeURIComponent(subject)}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Search */}
            <div className="mb-8">
                <div className="relative w-full lg:w-96">
                    <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                {searchQuery && (
                    <p className="mt-2 text-sm text-gray-500">
                        {filteredQuizzes.length} quiz founded
                    </p>
                )}
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredQuizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        onClick={() => handleQuizClick(quiz.id, quiz.subject)}
                        className={`bg-white rounded-lg p-6 shadow-sm border-l-[5px] ${colorMap[quiz.color]} transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col gap-2`}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {quiz.title}
                            </h3>
                            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {quiz.subject}
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            {quiz.description}
                        </p>

                        <p className="mt-2 text-xs font-medium text-gray-400">
                            {quiz.instructor}
                        </p>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredQuizzes.length === 0 && searchQuery && (
                <div className="pt-12 text-center text-gray-400">
                    <p className="text-lg">
                        Quiz not found "{searchQuery}"
                    </p>
                </div>
            )}
        </div>
    );
}