"use client"

import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { ISubject } from "@/app/types"
import { getCookie } from "@/lib/client-cookies"
import { BASE_API_URL } from "@/global"
import { get } from "@/lib/api-bridge"
import { ToastContainer } from "react-toastify"
import AddSubject from "./addSubject"
import DeleteSubject from "./deleteSubject"
import UpdateSubject from "./updateSubject"

export default function AdminSubject() {
    const [subject, setSubject] = useState<ISubject[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchSubject = async (search = "") => {
        try {
            setLoading(true)
            const token = getCookie("token")
            const url =  `${BASE_API_URL}/subject/all-data?search=${search}`
            const response = await get(url, token)

            if(response.data.data){
                setSubject(response.data.data)
            } else{
                setSubject([])
            }
        } catch (error) {
            console.log(false)
            setSubject([])
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const t = setTimeout(() => {
            fetchSubject(search)
        }, 400)

        return () => clearTimeout(t)
    }, [search])

    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer containerId={'toastSubject'} style={{ zIndex: 99999 }}/>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="relative w-full lg:w-1/4">
                    <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-primary     rounded-full text-sm focus:outline-none"/>
                </div>
                <div>
                    <AddSubject onSuccess={() => fetchSubject()}/>
                </div>
            </div>
            
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : subject.length === 0 ? (
                <p className="text-gray-500">No Data</p>
            ) : (
            <div className="bg-white rounded-xl shadow-sm mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                        <th className="px-6 py-4 text-left">ID</th>
                        <th className="px-6 py-4 text-left">SUBJECT</th>
                        <th className="px-6 py-4 text-left">CLASS</th>
                        <th className="px-6 py-4 text-left">CREATED AT</th>
                        <th className="px-6 py-4 text-left">UPDATED AT</th>
                        <th className="px-6 py-4 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">{data.idSubject}</td>
                            <td className="px-6 py-4">
                                {data.subject_name}
                            </td>
                            <td className="px-6 py-4">
                                {data.subjectClass?.map((sc) => sc.class?.class_name).join(", ")}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(data.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(data.updated_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <UpdateSubject data={data} onSuccess={() => fetchSubject()}/>
                                    <DeleteSubject data={data} onSuccess={() => fetchSubject()}/>
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