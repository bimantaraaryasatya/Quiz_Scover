"use client"

import { useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { MainButton } from "@/components/ButtonComponent"

interface Question {
    id: number
    text: string
    image?: string
    options: { label: string; value: string }[]
    correctAnswer: string
}

const quizQuestions: Question[] = [
    {
        id: 1,
        text: "Adi memberikan sebuah apel, lalu ia memberikan pada Anton. Berapa sisa buah yang dimiliki mia?",
        options: [
            { label: "Tidak tahu", value: "A" },
            { label: "Tidak tahu", value: "B" },
            { label: "Tidak tahu", value: "C" },
            { label: "Tidak tahu", value: "D" }
        ],
        correctAnswer: "A"
    },
    {
        id: 2,
        text: "2 + 2 = ?",
        options: [
            { label: "3", value: "A" },
            { label: "4", value: "B" },
            { label: "5", value: "C" },
            { label: "6", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 3,
        text: "Berapa hasil dari 5 × 3?",
        options: [
            { label: "10", value: "A" },
            { label: "12", value: "B" },
            { label: "15", value: "C" },
            { label: "20", value: "D" }
        ],
        correctAnswer: "C"
    },
    {
        id: 4,
        text: "Apa adalah ibu kota Indonesia?",
        options: [
            { label: "Surabaya", value: "A" },
            { label: "Jakarta", value: "B" },
            { label: "Bandung", value: "C" },
            { label: "Medan", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 5,
        text: "Berapa jumlah hari dalam seminggu?",
        options: [
            { label: "5 hari", value: "A" },
            { label: "6 hari", value: "B" },
            { label: "7 hari", value: "C" },
            { label: "8 hari", value: "D" }
        ],
        correctAnswer: "C"
    },
    {
        id: 6,
        text: "Adi memberikan sebuah apel, lalu ia memberikan pada Anton. Berapa sisa buah yang dimiliki mia?",
        image: "/images/apple.jpg",
        options: [
            { label: "Tidak tahu", value: "A" },
            { label: "Tidak tahu", value: "B" },
            { label: "Tidak tahu", value: "C" },
            { label: "Tidak tahu", value: "D" }
        ],
        correctAnswer: "D"
    },
    {
        id: 7,
        text: "Siapa presiden Indonesia pertama?",
        options: [
            { label: "Soekarno", value: "A" },
            { label: "Soeharto", value: "B" },
            { label: "Habibie", value: "C" },
            { label: "Gus Dur", value: "D" }
        ],
        correctAnswer: "A"
    },
    {
        id: 8,
        text: "Berapa hasil 10 ÷ 2?",
        options: [
            { label: "3", value: "A" },
            { label: "4", value: "B" },
            { label: "5", value: "C" },
            { label: "6", value: "D" }
        ],
        correctAnswer: "C"
    },
    {
        id: 9,
        text: "Apa warna bendera Indonesia?",
        options: [
            { label: "Merah dan biru", value: "A" },
            { label: "Merah dan putih", value: "B" },
            { label: "Putih dan biru", value: "C" },
            { label: "Hijau dan putih", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 10,
        text: "Berapa 7 × 8?",
        options: [
            { label: "54", value: "A" },
            { label: "56", value: "B" },
            { label: "58", value: "C" },
            { label: "60", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 11,
        text: "Apa adalah planet terbesar di tata surya?",
        options: [
            { label: "Bumi", value: "A" },
            { label: "Saturnus", value: "B" },
            { label: "Jupiter", value: "C" },
            { label: "Neptunus", value: "D" }
        ],
        correctAnswer: "C"
    },
    {
        id: 12,
        text: "Berapa hasil dari 15 + 25?",
        options: [
            { label: "35", value: "A" },
            { label: "40", value: "B" },
            { label: "45", value: "C" },
            { label: "50", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 13,
        text: "Siapa penemu listrik?",
        options: [
            { label: "Thomas Edison", value: "A" },
            { label: "Benjamin Franklin", value: "B" },
            { label: "Nikola Tesla", value: "C" },
            { label: "Alexander Graham Bell", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 14,
        text: "Berapa hasil 100 - 45?",
        options: [
            { label: "50", value: "A" },
            { label: "55", value: "B" },
            { label: "60", value: "C" },
            { label: "65", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 15,
        text: "Apa adalah simbol kimia untuk emas?",
        options: [
            { label: "Go", value: "A" },
            { label: "Au", value: "B" },
            { label: "Ag", value: "C" },
            { label: "Fe", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 16,
        text: "Berapa huruf dalam alfabet?",
        options: [
            { label: "24", value: "A" },
            { label: "25", value: "B" },
            { label: "26", value: "C" },
            { label: "27", value: "D" }
        ],
        correctAnswer: "C"
    },
    {
        id: 17,
        text: "Siapa penulis 'Harry Potter'?",
        options: [
            { label: "J.R.R. Tolkien", value: "A" },
            { label: "J.K. Rowling", value: "B" },
            { label: "George R.R. Martin", value: "C" },
            { label: "Stephen King", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 18,
        text: "Berapa jumlah bulan dalam setahun?",
        options: [
            { label: "10", value: "A" },
            { label: "11", value: "B" },
            { label: "12", value: "C" },
            { label: "13", value: "D" }
        ],
        correctAnswer: "C"
    },
    {
        id: 19,
        text: "Apa adalah ibu kota Jawa Barat?",
        options: [
            { label: "Bogor", value: "A" },
            { label: "Bandung", value: "B" },
            { label: "Bekasi", value: "C" },
            { label: "Depok", value: "D" }
        ],
        correctAnswer: "B"
    },
    {
        id: 20,
        text: "Berapa hasil dari 9²?",
        options: [
            { label: "72", value: "A" },
            { label: "81", value: "B" },
            { label: "90", value: "C" },
            { label: "99", value: "D" }
        ],
        correctAnswer: "B"
    }
]

export default function TakeQuizPage() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const quizId = params.id
    const subject = searchParams.get("subject") || "Quiz"

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set())

    const currentQuestion = quizQuestions[currentQuestionIndex]
    const totalQuestions = quizQuestions.length

    const handleSelectAnswer = (value: string) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: value
        })
    }

    const handleMarkForReview = () => {
        const newMarked = new Set(markedForReview)
        if (newMarked.has(currentQuestion.id)) {
            newMarked.delete(currentQuestion.id)
        } else {
            newMarked.add(currentQuestion.id)
        }
        setMarkedForReview(newMarked)
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handleGoToQuestion = (index: number) => {
        setCurrentQuestionIndex(index)
    }

    const handleFinishQuiz = () => {
        const answersJson = encodeURIComponent(JSON.stringify(answers))
        router.push(`/student/quiz-available/${quizId}/review?subject=${encodeURIComponent(subject)}&answers=${answersJson}`)
    }

    const isAnswered = currentQuestion.id in answers
    const isMarked = markedForReview.has(currentQuestion.id)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Good Morning, Misca!</h1>
                    <p className="text-sm text-gray-500">28 February 2026</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="font-semibold text-gray-800">Misca</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8">
                {/* Subject Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-8 py-8 rounded-lg mb-8">
                    <h2 className="text-3xl font-bold">{subject}</h2>
                </div>

                {/* Question Header */}
                <div className="mb-6">
                    <p className="text-lg font-semibold text-gray-700">
                        Question {currentQuestionIndex + 1} from {totalQuestions}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Navigation */}
                <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                    {quizQuestions.map((q, idx) => (
                        <button
                            key={q.id}
                            onClick={() => handleGoToQuestion(idx)}
                            className={`min-w-fit px-3 py-2 rounded font-semibold transition ${idx === currentQuestionIndex
                                ? "bg-blue-600 text-white"
                                : markedForReview.has(q.id)
                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                    : answers[q.id]
                                        ? "bg-green-100 text-green-700 border border-green-300"
                                        : "bg-gray-200 text-gray-700 border border-gray-300"
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>

                {/* Question Content */}
                <div className="bg-white rounded-xl p-8 mb-8 shadow-sm border border-gray-200">
                    {/* Question Text with Image */}
                    <div className="flex gap-8 mb-6">
                        {currentQuestion.image && (
                            <div className="flex-shrink-0 w-48">
                                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <img
                                        src={currentQuestion.image}
                                        alt="Question"
                                        className="w-full h-full object-cover rounded-lg"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e5e7eb' width='200' height='200'/%3E%3C/svg%3E"
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex-1">
                            <p className="text-gray-800 text-lg leading-relaxed">
                                {currentQuestion.text}
                            </p>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mt-8">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelectAnswer(option.value)}
                                className={`w-full p-4 rounded-lg text-left border-2 transition font-medium ${answers[currentQuestion.id] === option.value
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                <span className="inline-block w-6 h-6 rounded border border-current mr-3 text-center leading-5">
                                    {option.value}
                                </span>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleMarkForReview}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${isMarked
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50"
                            }`}
                    >
                        {isMarked ? "✓ Marked" : "Mark for review"}
                    </button>

                    <div className="flex gap-3">
                        {currentQuestionIndex === totalQuestions - 1 ? (
                            <button
                                onClick={handleFinishQuiz}
                                className="px-8 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                            >
                                Finish
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-8 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>

                {/* Summary Info */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                        Jawaban: <span className="font-semibold">{Object.keys(answers).length}</span> dari{" "}
                        <span className="font-semibold">{totalQuestions}</span> soal
                        {markedForReview.size > 0 && (
                            <span className="ml-4">
                                • Ditandai untuk review: <span className="font-semibold">{markedForReview.size}</span>
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
