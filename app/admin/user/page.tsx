"use client"

import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FiFilter } from "react-icons/fi"
import { IoReload } from "react-icons/io5"
import { FiEdit } from "react-icons/fi"
import { FiTrash2 } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io";

export default function AdminUser() {
    const [role, setRole] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [search, setSearch] = useState("")
    const [openRole, setOpenRole] = useState(false)

    const resetFilter = () => {
        setRole("")
        setCreatedAt("")
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="relative w-full lg:w-1/4">
                <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-primary     rounded-full text-sm focus:outline-none"/>
                </div>
            </div>

            <div className="flex flex-col gap-4 items-start md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col w-full md:w-fit md:flex-row md:flex-wrap bg-white border border-[#D5D5D5] rounded-xl">
                    {/* Icon */}
                    <div className="flex items-center gap-2 text-gray-600 p-4 md:p-4 
                                    border-b md:border-b-0 md:border-r border-[#D5D5D5]">
                        <FiFilter />
                    </div>
                    {/* Filter By */}
                    <div className="flex items-center p-4 md:p-4 
                                    border-b md:border-b-0 md:border-r border-[#D5D5D5]">
                        <span className="text-sm">Filter By</span>
                    </div>

                    {/* Role Dropdown */}
                    <div className="relative flex items-center p-4 md:p-4 
                                    border-b md:border-b-0 md:border-r border-[#D5D5D5]">
                        <button
                            onClick={() => setOpenRole(!openRole)}
                            className="text-sm flex items-center gap-2 w-full md:w-auto justify-between"
                        >
                            {role || "Role"} <IoIosArrowDown />
                        </button>

                        {openRole && (
                            <div className="absolute left-0 top-full mt-2 w-full md:w-40 
                                            bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                {["Student", "Admin", "Tentor"].map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => {
                                            setRole(item)
                                            setOpenRole(false)
                                        }}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div className="p-4 md:p-4 
                                    border-b md:border-b-0 md:border-r border-[#D5D5D5]">
                        <input
                            type="date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            className="text-sm border-none outline-none w-full"
                        />
                    </div>

                    {/* Reset */}
                    <button
                        onClick={resetFilter}
                        className="flex items-center gap-2 text-red-500 text-sm p-4 md:p-4"
                    >
                        <IoReload />
                        Reset Filter
                    </button>
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
                        <th className="px-6 py-4 text-left">USERNAME</th>
                        <th className="px-6 py-4 text-left">EMAIL</th>
                        <th className="px-6 py-4 text-left">ROLE</th>
                        <th className="px-6 py-4 text-left">CREATED AT</th>
                        <th className="px-6 py-4 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((item) => (
                        <tr key={item} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">00001</td>
                            <td className="px-6 py-4">
                            Christine Brooks
                            </td>
                            <td className="px-6 py-4">
                            christine@gmail.com
                            </td>
                            <td className="px-6 py-4">Student</td>
                            <td className="px-6 py-4">
                            04 Sep 2026
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