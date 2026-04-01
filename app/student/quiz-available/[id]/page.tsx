'use client'

import { useParams } from 'next/navigation';

const QuizDetailPage = () => {
    const params = useParams();
    const quizId = params?.id;

    // Data contoh untuk quiz
    const quizData = [
        {
            id: 1,
            title: "Mathematics",
            description: "Description...",
            duration: "65 Minutes",
            status: "Hard",
            statusType: "Overdue",
            buttonText: "DO QUIZ",
            buttonColor: "#0d47a1"
        },
        {
            id: 2,
            title: "Mathematics",
            description: "Description...",
            score: 90,
            status: "Hard",
            statusType: "Done",
            buttonText: "Review",
            buttonColor: "#0d47a1"
        }
    ];

    return (
        <div style={{
            padding: "2rem",
            backgroundColor: "#f9fafb",
            minHeight: "100vh"
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: "#1e5a96",
                color: "white",
                padding: "2rem",
                borderRadius: "8px",
                marginBottom: "2rem"
            }}>
                <h1 style={{
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                    margin: "0"
                }}>
                    Mathematics
                </h1>
            </div>

            {/* Quiz Cards Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem"
            }}>
                {quizData.map((quiz) => (
                    <div key={quiz.id} style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%"
                    }}>
                        {/* Title */}
                        <h3 style={{
                            fontSize: "1.125rem",
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                            color: "#1f2937"
                        }}>
                            {quiz.title}
                        </h3>

                        {/* Description */}
                        <p style={{
                            color: "#9ca3af",
                            fontSize: "0.875rem",
                            marginBottom: "1rem"
                        }}>
                            {quiz.description}
                        </p>

                        {/* Duration or Score */}
                        {quiz.duration && (
                            <p style={{
                                fontSize: "0.875rem",
                                color: "#0d47a1",
                                fontWeight: "600",
                                marginBottom: "1rem"
                            }}>
                                {quiz.duration}
                            </p>
                        )}

                        {quiz.score !== undefined && (
                            <p style={{
                                fontSize: "0.875rem",
                                color: "#0d47a1",
                                fontWeight: "600",
                                marginBottom: "1rem"
                            }}>
                                Score: {quiz.score}
                            </p>
                        )}

                        {/* Status Tags */}
                        <div style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginBottom: "1.5rem",
                            flexWrap: "wrap"
                        }}>
                            <span style={{
                                backgroundColor: "#3b82f6",
                                color: "white",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                fontWeight: "600"
                            }}>
                                {quiz.status}
                            </span>
                            <span style={{
                                backgroundColor: quiz.statusType === "Overdue" ? "#ef4444" : "#10b981",
                                color: "white",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                fontWeight: "600"
                            }}>
                                {quiz.statusType}
                            </span>
                        </div>

                        {/* Button */}
                        <button style={{
                            backgroundColor: quiz.buttonColor,
                            color: "white",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "6px",
                            border: "none",
                            fontWeight: "600",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            width: "100%",
                            transition: "background-color 0.2s"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#0a3a7f";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = quiz.buttonColor;
                            }}>
                            {quiz.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuizDetailPage
