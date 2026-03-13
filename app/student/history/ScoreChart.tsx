"use client"

import { IoIosArrowDown } from "react-icons/io"

interface ScoreChartProps {
    chartData: { month: string; score: number }[]
    timeRange: string
    setTimeRange: (value: string) => void
    openTimeRange: boolean
    setOpenTimeRange: (value: boolean) => void
}

export default function ScoreChart({
    chartData,
    timeRange,
    setTimeRange,
    openTimeRange,
    setOpenTimeRange
}: ScoreChartProps) {

    return (
        <div className="bg-white border border-[#D5D5D5] rounded-xl p-6">

            <div className="flex justify-between items-center px-6">

                <h3 className="text-lg font-semibold text-gray-800">
                    Your Score
                </h3>

                <div className="relative">

                    <button
                        onClick={() => setOpenTimeRange(!openTimeRange)}
                        className="flex items-center gap-2 text-sm border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                        {timeRange === "6 Months" ? "Last 6 Months" : timeRange}
                        <IoIosArrowDown />
                    </button>

                    {openTimeRange && (
                        <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">

                            {["Last 6 Months", "Last 3 Months", "Last Month"].map((item) => (

                                <div
                                    key={item}
                                    onClick={() => {
                                        setTimeRange(item)
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

            <div className="h-82 relative">

                <svg className="w-full h-full" viewBox="0 0 600 240">

                    {[0, 25, 50, 75, 100].map((value) => (

                        <g key={value}>

                            <line
                                x1="50"
                                y1={200 - value * 1.5}
                                x2="550"
                                y2={200 - value * 1.5}
                                stroke="#e5e7eb"
                                strokeWidth="1"
                            />

                            <text
                                x="40"
                                y={205 - value * 1.5}
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
    )
}