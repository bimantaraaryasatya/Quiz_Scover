"use client"

import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import { IoReload } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"

export default function StudentHistory() {

const [subject, setSubject] = useState("")
const [grade, setGrade] = useState("")
const [difficulty, setDifficulty] = useState("")
const [timeRange, setTimeRange] = useState("6months")

const [openSubject, setOpenSubject] = useState(false)
const [openGrade, setOpenGrade] = useState(false)
const [openDifficulty, setOpenDifficulty] = useState(false)
const [openTimeRange, setOpenTimeRange] = useState(false)

const resetFilter = () => {
setSubject("")
setGrade("")
setDifficulty("")
setTimeRange("6months")
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
{ id: "28 Jan 2026", name: "Matematika PM", subject: "Matematika", class: "P. UTBK", grade: "90" },
{ id: "27 Jan 2026", name: "Physics Basic", subject: "Physics", class: "10-A", grade: "85" },
{ id: "26 Jan 2026", name: "Chemistry Lab", subject: "Chemistry", class: "10-B", grade: "78" },
{ id: "25 Jan 2026", name: "Biology Quiz", subject: "Biology", class: "10-A", grade: "92" },
{ id: "24 Jan 2026", name: "English Test", subject: "English", class: "10-C", grade: "88" }
]

const averageScore =
historyData.reduce((acc, item) => acc + parseInt(item.grade), 0) /
historyData.length

return (
<div className="bg-gray-50 min-h-screen p-6">

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

<div className="bg-white border border-[#D5D5D5] rounded-xl p-6">

<div className="flex justify-between items-center mb-6">

<h3 className="text-lg font-semibold text-gray-800">
Your Score
</h3>

<div className="relative">

<button
onClick={() => setOpenTimeRange(!openTimeRange)}
className="flex items-center gap-2 text-sm border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
>

{timeRange === "6months" ? "Last 6 Months" : timeRange}
<IoIosArrowDown />

</button>

{openTimeRange && (

<div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">

{["Last 6 Months", "Last 3 Months", "Last Month"].map((item) => (

<div
key={item}
onClick={() => {
setTimeRange(item.replace(" ", "").toLowerCase())
setOpenTimeRange(false)
}}
className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
>

{item}

</div>

))}

</div>

)}

</div>

</div>

{/* Chart SVG */}

<div className="h-64 relative">

<svg className="w-full h-full" viewBox="0 0 600 200">

{[0, 25, 50, 75, 100].map((value) => (

<g key={value}>

<line
x1="50"
y1={200 - (value * 1.5)}
x2="550"
y2={200 - (value * 1.5)}
stroke="#e5e7eb"
strokeWidth="1"
/>

<text
x="40"
y={205 - (value * 1.5)}
textAnchor="end"
className="text-xs fill-gray-500"
>

{value}

</text>

</g>

))}

<polyline
points={chartData.map((data, index) =>
`${50 + (index * 100)},${200 - (data.score * 1.5)}`
).join(" ")}
fill="none"
stroke="#3b82f6"
strokeWidth="3"
/>

{chartData.map((data, index) => (

<circle
key={index}
cx={50 + (index * 100)}
cy={200 - (data.score * 1.5)}
r="5"
fill="#3b82f6"
/>

))}

{chartData.map((data, index) => (

<text
key={index}
x={50 + (index * 100)}
y="220"
textAnchor="middle"
className="text-xs fill-gray-500"
>

{data.month}

</text>

))}

</svg>

</div>

</div>

</div> {/* <-- PENUTUP REPORT YANG HILANG */}

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
            {subject || "Subject"} <IoIosArrowDown />
        </button>

        {openSubject && (
            <div className="absolute left-0 top-full mt-2 w-full md:w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                {["Mathematics", "Physics", "Chemistry", "Biology", "English"].map((item) => (
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

<div className="bg-white border border-[#D5D5D5] rounded-xl overflow-hidden">

<table className="w-full">

<thead>

<tr className="border-b border-gray-200 bg-gray-50">

<th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
<th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NAME</th>
<th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">SUBJECT</th>
<th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">CLASS</th>
<th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">GRADE</th>

</tr>

</thead>

<tbody>

{historyData.map((item, index) => (

<tr key={index} className="border-b border-gray-100 hover:bg-gray-50">

<td className="py-3 px-4 text-sm text-gray-800 font-medium">{item.id}</td>
<td className="py-3 px-4 text-sm text-gray-600">{item.name}</td>
<td className="py-3 px-4 text-sm text-gray-600">{item.subject}</td>
<td className="py-3 px-4 text-sm text-gray-600">{item.class}</td>

<td className="py-3 px-4">

<span className={`text-sm font-semibold ${
parseInt(item.grade) >= 90
? 'text-green-600'
: parseInt(item.grade) >= 80
? 'text-blue-600'
: 'text-yellow-600'
}`}>

{item.grade}

</span>

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