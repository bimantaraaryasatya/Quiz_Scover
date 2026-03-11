"use client"

import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FiTrendingUp, FiCalendar, FiAward } from "react-icons/fi"

export default function TentorHome() {

    const [search, setSearch] = useState("")

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: "long",
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const getGreeting = () => {
        const hour = new Date().getHours()

        if (hour < 12) return "Good Morning"
        if (hour < 18) return "Good Afternoon"
        return "Good Evening"
    }

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {getGreeting()}, Misca! 👋
                    </h1>

                    <p className="text-gray-500 flex items-center gap-2">
                        <FiCalendar />
                        {currentDate}
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-96">

                    <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                    <input
                        type="text"
                        placeholder="What your mood said to study?"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                </div>

            </div>


            {/* Journey + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                {/* Journey Card */}
                <div className="bg-linear-to-r from-[#1f4f6e] to-[#4a7bd8] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">
                            My Learning Journey
                        </h2>
                    </div>

                    <div>
                        <a href="/student/history" className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-50 transition">
                            Explore
                        </a>

                    </div>
                </div>


                {/* Avg Quiz */}
                <div className="bg-linear-to-r from-[#F6D365] to-[#F6C84C] rounded-2xl p-6 text-gray-800 shadow-md">

                    <div className="flex items-center justify-between mb-4">

                        <div className="bg-white/30 p-3 rounded-xl">
                            <FiTrendingUp className="text-xl" />
                        </div>

                        <span className="text-sm bg-white/30 px-3 py-1 rounded-full">
                            1.3% Up from past week
                        </span>

                    </div>

                    <h3 className="text-3xl font-bold mb-1">
                        3.5
                    </h3>

                    <p className="text-gray-700 text-sm">
                        Avg Quiz Played
                    </p>

                </div>


                {/* Avg Score */}
                <div className="bg-linear-to-r from-[#F6D365] to-[#F6C84C] rounded-2xl p-6 text-gray-800 shadow-md">

                    <div className="flex items-center justify-between mb-4">

                        <div className="bg-white/30 p-3 rounded-xl">
                            <FiAward className="text-xl" />
                        </div>

                        <span className="text-sm bg-white/30 px-3 py-1 rounded-full">
                            1.3% Up from past week
                        </span>

                    </div>

                    <h3 className="text-3xl font-bold mb-1">
                        95.5
                    </h3>

                    <p className="text-gray-700 text-sm">
                        Avg Score
                    </p>

                </div>

            </div>


            {/* Subjects */}
            <div className="mb-8">

                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-xl font-bold text-gray-800">
                        Subjects
                    </h2>

                    <a href="/student/quiz-available" className="text-sm text-blue-600 hover:text-blue-700">
                        See more
                    </a>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    <div className="bg-[#AFC3E0] rounded-2xl p-5 shadow-md hover:shadow-lg transition hover:cursor-pointer">
                        <h3 className="font-bold text-gray-800 mb-2">Mathematics</h3>
                        <p className="text-gray-600 text-sm mb-3">Description...</p>
                        <p className="text-gray-500 text-xs">Rudi Wicaksono</p>
                    </div>

                    <div className="bg-[#A9D3D8] rounded-2xl p-5 shadow-md hover:shadow-lg transition">
                        <h3 className="font-bold text-gray-800 mb-2">Mathematics</h3>
                        <p className="text-gray-600 text-sm mb-3">Description...</p>
                        <p className="text-gray-500 text-xs">Rudi Wicaksono</p>
                    </div>

                    <div className="bg-[#A9D4C6] rounded-2xl p-5 shadow-md hover:shadow-lg transition">
                        <h3 className="font-bold text-gray-800 mb-2">Mathematics</h3>
                        <p className="text-gray-600 text-sm mb-3">Description...</p>
                        <p className="text-gray-500 text-xs">Rudi Wicaksono</p>
                    </div>

                    <div className="bg-[#E7D9A8] rounded-2xl p-5 shadow-md hover:shadow-lg transition">
                        <h3 className="font-bold text-gray-800 mb-2">Mathematics</h3>
                        <p className="text-gray-600 text-sm mb-3">Description...</p>
                        <p className="text-gray-500 text-xs">Rudi Wicaksono</p>
                    </div>

                </div>

            </div>


            {/* Recently Table */}
            <div className=" mb-8">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-xl font-bold text-gray-800">
                        Recently
                    </h2>

                    <a href="/student/history" className="text-blue-600 hover:text-blue-700 text-sm">
                        See more 
                    </a>

                </div>


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
                            {[1, 2, 3].map((item) => (
                            <tr key={item} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">00001</td>
                                <td className="px-6 py-4">
                                Matematika PM
                                </td>
                                <td className="px-6 py-4">Matematika</td>   
                                <td className="px-6 py-4">Kelas 12 UTBK</td>
                                <td className="px-6 py-4">12.30</td>
                                <td className="px-6 py-4">13.30</td>
                                <td className="px-6 py-4 text-green-500">90</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            </div>
        </div>
    )
}