"use client"

import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { IClasses } from "@/app/types"
import { getCookie } from "@/lib/client-cookies"
import { BASE_API_URL } from "@/global"
import { get } from "@/lib/api-bridge"
import { ToastContainer} from "react-toastify"
import AddClass from "./addClass"
import UpdateClass from "./updateClass"
import DeleteClass from "./deleteClass"

export default function AdminClass() {
    const [classes, setClasses] = useState<IClasses[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchClass = async (search = "") => {
        try {
            setLoading(true)
            const token = getCookie("token")
            const url = `${BASE_API_URL}/class/allData?search=${search}`
            const response = await get(url, token)

            if (response?.data?.status) {
                setClasses(response.data.data)
            } else {
                setClasses([])
            }
        } catch (error) {
            console.log(error)
            setClasses([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const t = setTimeout(() => {
            fetchClass(search)
        }, 400)

        return () => clearTimeout(t)
    }, [search])
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer containerId={'toastClass'} style={{ zIndex: 99999 }}/>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="relative w-full lg:w-1/4">
                    <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-primary     rounded-full text-sm focus:outline-none"/>
                </div>
                <div>
                    <AddClass onSuccess={() => fetchClass()} />
                </div>
            </div>
            
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : classes.length === 0 ? (
                <p className="text-gray-500">No Data</p>
            ) : (
                <div className="bg-white rounded-xl shadow-sm mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                            <th className="px-6 py-4 text-left">ID</th>
                            <th className="px-6 py-4 text-left">CLASS</th>
                            <th className="px-6 py-4 text-left">CLASS PROGRAM</th>
                            <th className="px-6 py-4 text-left">CREATED AT</th>
                            <th className="px-6 py-4 text-left">UPDATED AT</th>
                            <th className="px-6 py-4 text-left">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((data, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{data.idClass}</td>
                                <td className="px-6 py-4">
                                {data.class_name}
                                </td>
                                <td className="px-6 py-4">
                                {data.class_program || "No Program"}
                                </td>
                                <td className="px-6 py-4">
                                {new Date(data.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                {new Date(data.updated_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <UpdateClass data={data} onSuccess={() => fetchClass()}/>
                                        <DeleteClass data={data} onSuccess={() => fetchClass()}/>
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