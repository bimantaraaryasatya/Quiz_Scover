"use client"

import { useEffect, useState } from "react"
import Icon_Dashboard from "@/public/images/Icon_Dashboard.png"
import Icon_Dashboard2 from "@/public/images/Icon_Dashboard2.png"
import Icon_Dashboard3 from "@/public/images/Icon_Dashboard3.png"

export default function AdminPage() {
  const [date, setDate] = useState("")

  useEffect(() => {
    const now = new Date()
    const formatted = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setDate(formatted)
  }, [])

  // ========================
  // Dummy Data
  // ========================
  const statsData = [
    {
      id: 1,
      title: "Total User Online",
      value: "2,500",
      change: "+8.5%",
      desc: "Up from yesterday",
      image: Icon_Dashboard.src
    },
    {
      id: 2,
      title: "Avg Quiz Played",
      value: "3.5",
      change: "+1.3%",
      desc: "Up from past week",
      image: Icon_Dashboard2.src
    },
    {
      id: 3,
      title: "Avg Score",
      value: "80%",
      change: "-4.3%",
      desc: "Down from yesterday",
      image: Icon_Dashboard3.src
    },
  ]

  const activityData = [
    {
      id: 1,
      name: "John Doe",
      activity: "Just Created New Quiz LATSOL BI: BI-7",
    },
    {
      id: 2,
      name: "John Doe",
      activity: "Just Created New Quiz LATSOL BI: BI-7",
    },
    {
      id: 3,
      name: "John Doe",
      activity: "Just Created New Quiz LATSOL BI: BI-7",
    },
    {
      id: 4,
      name: "John Doe",
      activity: "Just Created New Quiz LATSOL BI: BI-7",
    },
  ]

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Good Morning, Admin</h1>
        <p className="text-gray-500">{date}</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {statsData.map((item) => {
          const isPositive = item.change.includes("+")
          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl shadow-sm"
            >
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">{item.title}</p>
                        <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
                    </div>
                    <div>
                        <img src={item.image} alt="" />
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm">
                    <span
                    className={
                        isPositive ? "text-green-500" : "text-red-500"
                    }
                    >
                    {item.change}
                    </span>
                    <span className="text-gray-400">
                    {item.desc}
                    </span>
                </div>
            </div>
          )
        })}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm h-fit">
          <h3 className="font-semibold mb-4">
            Average Student Assessment Score
          </h3>

          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Recent Activity</h3>

          <div className="space-y-4">
            {activityData.map((item) => (
              <div
                key={item.id}
                className="border border-[#0089FF] rounded-lg p-4 bg-white hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div>
                    <h4 className="font-semibold">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.activity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}