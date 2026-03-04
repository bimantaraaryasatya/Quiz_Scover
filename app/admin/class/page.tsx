"use client"

import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FiFilter } from "react-icons/fi"
import { IoReload } from "react-icons/io5"
import { FiEdit } from "react-icons/fi"
import { FiTrash2 } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io";

export default function AdminUser() {
    const [search, setSearch] = useState("")

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="relative w-full lg:w-1/4">
                    <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-primary     rounded-full text-sm focus:outline-none"/>
                </div>
                <div>
                    <button className="bg-[#1B4F72] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center gap-2 hover:opacity-90">
                        + Create
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                        <th className="px-6 py-4 text-left">ID</th>
                        <th className="px-6 py-4 text-left">CLASS</th>
                        <th className="px-6 py-4 text-left">CREATED AT</th>
                        <th className="px-6 py-4 text-left">UPDATED AT</th>
                        <th className="px-6 py-4 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((item) => (
                        <tr key={item} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">00001</td>
                            <td className="px-6 py-4">
                            12 SMA
                            </td>
                            <td className="px-6 py-4">
                            04 Sep 2026
                            </td>
                            <td className="px-6 py-4">
                            14 Sep 2026
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <button className="border border-blue-500 text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition">
                                        <FiEdit />
                                    </button>
                                    <button className="border border-red-500 text-red-500 p-2 rounded-lg hover:bg-red-50 transition">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}