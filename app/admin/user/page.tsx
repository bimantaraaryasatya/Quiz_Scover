"use client"

import { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import { FiFilter } from "react-icons/fi"
import { IoReload } from "react-icons/io5"
import { FiEdit } from "react-icons/fi"
import { FiTrash2 } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io";
import { IUser } from "@/app/types"
import { getCookie } from "@/lib/client-cookies"
import { BASE_API_URL } from "@/global"
import { get } from "@/lib/api-bridge"
import { ToastContainer } from "react-toastify"
import DeleteUser from "./deleteUser"
import AddUser from "./addUser"
import UpdateUser from "./updateUser"

export default function AdminUser() {
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [search, setSearch] = useState("")
    const [openRole, setOpenRole] = useState(false)

    const resetFilter = () => {
        setRole("")
        setCreatedAt("")
    }

    const fetchUsers = async (search = "") => {
        try {
            const token = getCookie("token")
            const url = `${BASE_API_URL}/user/getAll?search=${search}`
            const response = await get(url, token)

            if (response.data.data) {
                setUsers(response.data.data)
            } else {
                setUsers([])
            }
        } catch (error) {
            console.log(error)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const t = setTimeout(() => {
            fetchUsers(search)
        }, 400)

        return () => clearTimeout(t)
    }, [search])

    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer containerId={'toastUser'} style={{ zIndex: 99999 }}/>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="relative w-full lg:w-1/4">
                <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-primary     rounded-full text-sm focus:outline-none"/>
                </div>
            </div>

            <div className="flex flex-col gap-4 items-start md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col w-full md:w-fit md:flex-row md:flex-wrap bg-white border border-[#D5D5D5] rounded-xl font-medium">
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
                            className="text-sm flex items-center gap-2 w-full md:w-auto justify-between hover:cursor-pointer"
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
                            className="text-sm border-none outline-none w-full hover:cursor-pointer"
                        />
                    </div>

                    {/* Reset */}
                    <button
                        onClick={resetFilter}
                        className="flex items-center gap-2 text-red-500 text-sm p-4 md:p-4 hover:cursor-pointer"
                    >
                        <IoReload />
                        Reset Filter
                    </button>
                </div>

                <div>
                    <AddUser onSuccess={() => fetchUsers()} />
                </div>
            </div>
            
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : users.length === 0 ? (
                <p className="text-gray-500">No Data</p>
            ) : (
                <div className="bg-white rounded-xl shadow-sm mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                            <th className="px-6 py-4 text-left">ID</th>
                            <th className="px-6 py-4 text-left">PHOTO</th>
                            <th className="px-6 py-4 text-left">FULL NAME</th>
                            <th className="px-6 py-4 text-left">USERNAME</th>
                            <th className="px-6 py-4 text-left">EMAIL</th>
                            <th className="px-6 py-4 text-left">CLASS</th>
                            <th className="px-6 py-4 text-left">ROLE</th>
                            <th className="px-6 py-4 text-left">PHONE NUMBER</th>
                            <th className="px-6 py-4 text-left">PARENT FULL NAME</th>
                            <th className="px-6 py-4 text-left">PARENT PHONE NUMBER</th>
                            <th className="px-6 py-4 text-left">CREATED AT</th>
                            <th className="px-6 py-4 text-left">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((data, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{data.idUser}</td>
                                <td className="px-4 py-4">
                                    <img
                                        src={
                                            !data.photoProfile
                                            ? `${BASE_API_URL}/public/user_image/user_profile.jpg`
                                            : `${BASE_API_URL}/public/user_image/${data.photoProfile}`
                                        }
                                        alt="user"
                                        className="w-12 h-12 object-cover rounded-full"
                                        onError={(e) => {
                                            e.currentTarget.src = `${BASE_API_URL}/public/user_image/user_profile.jpg`
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4">{data.full_name}</td>
                                <td className="px-6 py-4">
                                {data.userName}
                                </td>
                                <td className="px-6 py-4">
                                {data.email}
                                </td>
                                <td className="px-6 py-4">{data.class?.class_name}</td>
                                <td className="px-6 py-4">{data.role}</td>
                                <td className="px-6 py-4">
                                {data.phone_number}
                                </td>
                                <td className="px-6 py-4">
                                    {data.parent_full_name}
                                </td>
                                <td className="px-6 py-4">
                                    {data.parent_phone_number}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(data.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <UpdateUser data={data} onSuccess={() => fetchUsers()} />
                                        <DeleteUser data={data} onSuccess={() => fetchUsers()} />
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
  )
}