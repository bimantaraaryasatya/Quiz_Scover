"use client"

import Image from "next/image"
import { MainButton } from "@/components/ButtonComponent"
import Profile from "@/public/images/profile.jpeg"
import { useState, useEffect } from "react"
import { getCookie } from "@/lib/client-cookies"
import { IAdmin } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { get } from "@/lib/api-bridge"

export default function AdminProfile() {
    const [admin, setAdmin] = useState<IAdmin[]>([])
    const [idAdmin, setIdAdmin] = useState(0)
    const fetchAdmin = async () => {
        try {
            const token = getCookie("token")
            const idAdmin = getCookie("id")
            if (idAdmin) {
                setIdAdmin(parseInt(idAdmin))
            }
            console.log("ID Admin:", idAdmin)
            const url = `${BASE_API_URL}/admin/internal/get-admin/${idAdmin}`
            const response = await get(url, token, {
                "Content-Type": "application/json",
            })

            if (response.data.data) {
                setAdmin([response.data.data])
                console.log("DATA ADMIN:", response.data.data)
            }else {
                setAdmin([])
            }
        } catch (error) {
            console.log(error)
            setAdmin([])
        }
    }

    useEffect(() => {
        fetchAdmin()
    }, [])
    return (
        <div className="flex flex-col gap-8">

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-xl md:text-2xl font-semibold">
                        Personal Details
                    </h1>

                    <MainButton className="w-fit flex items-center gap-2" type="button" onClick={() => alert("Edit Clicked")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Edit
                    </MainButton>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 md:gap-25 md:py-10">

                    <div className="flex justify-start">
                        <div className="w-32 h-40 md:w-32 md:h-40 lg:h-full relative rounded-xl overflow-hidden">
                            <Image
                                src={Profile}
                                alt="Profile"
                                fill
                            />
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row flex-1 gap-8 xl:gap-12">
                            {admin.map((data, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-5">
                                    <InfoItem label="Username" value={data.username} />
                                    <InfoItem label="Email" value={data.email} />
                                    <InfoItem label="Phone Number" value={data.phone_number} />
                                    <InfoItem label="Role" value={data.role} />
                                    <InfoItem label="Admin ID" value={idAdmin} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-800 wrap-break-words">{value}</p>
        </div>
    )
}