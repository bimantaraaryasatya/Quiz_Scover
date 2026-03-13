"use client"

import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import { IoReload } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"
import ScoreChart from "./ScoreChart"

export default function StudentHistory() {

    const [subject, setSubject] = useState("")
    const [grade, setGrade] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [timeRange, setTimeRange] = useState("6 Months")

    const [openSubject, setOpenSubject] = useState(false)
    const [openTimeRange, setOpenTimeRange] = useState(false)

    const resetFilter = () => {
        setSubject("")
        setGrade("")
        setDifficulty("")
        setTimeRange("6 months")
    }

    const chartData = [
        { month: "Jan", score: 75 },
        { month: "Feb", score: 82 },
        { month: "Mar", score: 78 },
        { month: "Apr", score: 88 },
        { month: "May", score: 92 },
        { month: "Jun", score: 90 }
    ]

    const historyData = [
        {
            id: "00001",
            quizName: "Matematika PM",
            subject: "Matematika",
            class: "Kelas 12 UTBK",
            start: "12.30",
            finished: "13.30",
            score: 90
        },
        {
            id: "00002",
            quizName: "Physics Basic",
            subject: "Physics",
            class: "10-A",
            start: "09.00",
            finished: "10.00",
            score: 85
        },
        {
            id: "00003",
            quizName: "Chemistry Lab",
            subject: "Chemistry",
            class: "10-B",
            start: "11.00",
            finished: "11.45",
            score: 78
        }
    ]

    const averageScore =
        historyData.reduce((acc, item) => acc + item.score, 0) /
        historyData.length

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Learning Journey */}

            <div className="bg-gradient-to-r from-[#184E68] to-[#4F86E8] rounded-2xl p-8 text-white shadow-lg mb-10">

                <h2 className="text-3xl font-semibold tracking-wide">
                    My Learning Journey
                </h2>

                <p className="opacity-80 mt-2 text-sm">
                    Track your performance and keep improving every month
                </p>

            </div>

            {/* Report */}

            <div className="mb-10">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Report
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    <div className="bg-gradient-to-r from-[#3A7BD5] to-[#6FB1FC] rounded-2xl p-7 text-white shadow-md">

                        <h2 className="text-sm opacity-80 mb-2">
                            Average Score
                        </h2>

                        <p className="text-4xl font-bold">
                            {averageScore.toFixed(1).replace(".", ",")}
                        </p>

                        <p className="text-xs opacity-80 mt-2">
                            Based on last quizzes taken
                        </p>

                    </div>

                    <div className="bg-gradient-to-r from-[#4A6CF7] to-[#7F9CF5] rounded-2xl p-7 text-white shadow-md">

                        <h2 className="text-sm opacity-80 mb-2">
                            Total Task Finished
                        </h2>

                        <p className="text-4xl font-bold">
                            {historyData.length}
                        </p>

                        <p className="text-xs opacity-80 mt-2">
                            All completed quizzes
                        </p>

                    </div>

                </div>

                {/* Chart */}
                <ScoreChart
                    chartData={chartData}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    openTimeRange={openTimeRange}
                    setOpenTimeRange={setOpenTimeRange}
                />
            </div>

            {/* History Section */}

            <div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    History
                </h2>

                {/* Filter Section */}

                <div className="flex flex-col gap-4 items-start md:flex-row md:justify-between md:items-center mb-6">

                    <div className="flex flex-col w-full md:w-fit md:flex-row md:flex-wrap bg-white border border-[#D5D5D5] rounded-xl font-medium">

                        <div className="flex items-center gap-2 text-gray-600 p-4 border-b md:border-b-0 md:border-r border-[#D5D5D5]">
                            <FiFilter />
                        </div>

                        <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-[#D5D5D5]">
                            <span className="text-sm">Filter By</span>
                        </div>

                        {/* Subject Dropdown */}

                        <div className="relative flex items-center p-4 border-b md:border-b-0 md:border-r border-[#D5D5D5]">

                            <button
                                onClick={() => setOpenSubject(!openSubject)}
                                className="text-sm flex items-center gap-2 w-full md:w-auto justify-between hover:cursor-pointer"
                            >

                                {subject || "Subject"}
                                <IoIosArrowDown />

                            </button>

                            {openSubject && (

                                <div className="absolute left-0 top-full mt-2 w-full md:w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">

                                    {[
                                        "Mathematics",
                                        "Physics",
                                        "Chemistry",
                                        "Biology",
                                        "English"
                                    ].map((item) => (

                                        <div
                                            key={item}
                                            onClick={() => {
                                                setSubject(item)
                                                setOpenSubject(false)
                                            }}
                                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        >

                                            {item}

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                        <button
                            onClick={resetFilter}
                            className="flex items-center gap-2 text-red-500 text-sm p-4 hover:cursor-pointer"
                        >

                            <IoReload />
                            Reset Filter

                        </button>

                    </div>

                </div>

                {/* Table */}

                <div className="bg-white rounded-xl shadow-sm mt-6 overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead className="bg-gray-100 text-gray-600">

                            <tr>

                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">QUIZ NAME</th>
                                <th className="px-6 py-4 text-left">SUBJECT</th>
                                <th className="px-6 py-4 text-left">CLASS</th>
                                <th className="px-6 py-4 text-left">START</th>
                                <th className="px-6 py-4 text-left">FINISHED</th>
                                <th className="px-6 py-4 text-left">SCORE</th>

                            </tr>

                        </thead>

                        <tbody>

                            {historyData.map((item) => (

                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >

                                    <td className="px-6 py-4">00001</td>
                                    <td className="px-6 py-4">
                                        {item.quizName}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.subject}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.class}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.start}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.finished}
                                    </td>

                                    <td className="px-6 py-4 text-green-500">
                                        {item.score}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}