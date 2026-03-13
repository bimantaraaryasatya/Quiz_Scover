"use client"

import { useState } from "react";

const quizzes = [
    { id: 1, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "blue" },
    { id: 2, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "cyan" },
    { id: 3, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "green" },
    { id: 4, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "yellow" },
    { id: 5, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "blue" },
    { id: 6, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "cyan" },
    { id: 7, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "green" },
    { id: 8, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "yellow" },
    { id: 9, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "blue" },
    { id: 10, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "cyan" },
    { id: 11, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "green" },
    { id: 12, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "yellow" },
    { id: 13, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "blue" },
    { id: 14, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "cyan" },
    { id: 15, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "green" },
    { id: 16, title: "Mathematics", description: "Description...", instructor: "Rudi Wicaksono", color: "yellow" },
];

export default function StudentQuizAvailable() {
    const [searchQuery, setSearchQuery] = useState("");

    const colorMap: Record<string, string> = {
        blue: "#3b82f6",
        cyan: "#06b6d4",
        green: "#10b981",
        yellow: "#eab308",
    };

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{
            padding: "2rem",
            backgroundColor: "#f9fafb",
            minHeight: "100vh"
        }}>
            <div style={{
                marginBottom: "2rem"
            }}>
                <input
                    type="text"
                    placeholder="🔍 Cari quiz berdasarkan judul, deskripsi, atau instruktur..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        padding: "0.75rem 1rem",
                        fontSize: "1rem",
                        border: "2px solid #e5e7eb",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box"
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3b82f6";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                    }}
                />
                {searchQuery && (
                    <p style={{
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#6b7280"
                    }}>
                        Ditemukan {filteredQuizzes.length} quiz
                    </p>
                )}
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem"
            }}>
                {filteredQuizzes.map((quiz) => (
                    <div 
                        key={quiz.id}
                        style={{
                            backgroundColor: "white",
                            borderLeft: `5px solid ${colorMap[quiz.color as keyof typeof colorMap]}`,
                            borderRadius: "8px",
                            padding: "1.5rem",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem"
                        }}
                        onMouseEnter={(e) => {
                            const element = e.currentTarget as HTMLDivElement;
                            element.style.transform = "translateY(-4px)";
                            element.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                            const element = e.currentTarget as HTMLDivElement;
                            element.style.transform = "translateY(0)";
                            element.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                        }}
                    >
                        <h3 style={{
                            margin: "0",
                            fontSize: "1.25rem",
                            fontWeight: "600",
                            color: "#1f2937"
                        }}>
                            {quiz.title}
                        </h3>
                        <p style={{
                            margin: "0",
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            lineHeight: "1.5"
                        }}>
                            {quiz.description}
                        </p>
                        <p style={{
                            margin: "0.5rem 0 0 0",
                            fontSize: "0.85rem",
                            color: "#9ca3af",
                            fontWeight: "500"
                        }}>
                            {quiz.instructor}
                        </p>
                    </div>
                ))}
            </div>
            {filteredQuizzes.length === 0 && searchQuery && (
                <div style={{
                    textAlign: "center",
                    paddingTop: "3rem",
                    color: "#9ca3af"
                }}>
                    <p style={{ fontSize: "1.125rem" }}>Tidak ada quiz yang sesuai dengan pencarian "{searchQuery}"</p>
                </div>
            )}
        </div>
    )
}