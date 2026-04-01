"use client"

import { QuizDifficulty, DoneTag, DueTag, OverdueTag } from "@/components/BadgeTagComponent"
import { MainButton } from "@/components/ButtonComponent"

const QuizDetailPage = () => {
    const quizData = [
        {
            id: 1,
            title: "Mathematics",
            description: "Description...",
            duration: "65 Minutes",
            difficulty: "Hard",
            statusType: "Overdue",
            buttonText: "DO QUIZ"
        },
        {
            id: 2,
            title: "Mathematics",
            description: "Description...",
            score: 90,
            difficulty: "Hard",
            statusType: "Done",
            buttonText: "Review"
        }
    ]

    return (
        <div className="min-h-screen">

            {/* HEADER */}
            <div className="bg-linear-to-r from-blue-900 to-blue-500 text-white px-8 py-15 rounded-xl mb-8 shadow">
                <h1 className="text-2xl font-bold">Mathematics</h1>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {quizData.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between items-start"
                    >

                        {/* LEFT */}
                        <div className="flex flex-col gap-2">

                            {/* TITLE + INFO */}
                            <div className="flex items-center gap-4 justify-between w-full">
                                <h3 className="font-bold text-gray-800">
                                    {quiz.title}
                                </h3>

                                {quiz.duration && (
                                    <span className="text-sm font-semibold text-primary">
                                        {quiz.duration}
                                    </span>
                                )}

                                {quiz.score !== undefined && (
                                    <span className="text-sm font-semibold text-primary">
                                        Score: {quiz.score}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4 mt-2 w-full">
                            {/* DESC */}
                            <p className="text-sm text-gray-400">
                                {quiz.description}
                            </p>
                            <div className="flex flex-col md:flex-row justify-between gap-5 w-full items-start md:items-center">
                                <div className="flex gap-2">
                                    <QuizDifficulty>
                                        {quiz.difficulty}
                                    </QuizDifficulty>

                                    {quiz.statusType === "Done" && (
                                        <DoneTag>Done</DoneTag>
                                    )}

                                    {quiz.statusType === "Overdue" && (
                                        <OverdueTag>Overdue</OverdueTag>
                                    )}

                                    {quiz.statusType === "Due" && (
                                        <DueTag>Due</DueTag>
                                    )}

                                </div>
                                <MainButton type="button" onClick={() => alert(`${quiz.buttonText} Clicked`)} className="w-full justify-center md:w-fit">
                                    {quiz.buttonText}
                                </MainButton>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default QuizDetailPage