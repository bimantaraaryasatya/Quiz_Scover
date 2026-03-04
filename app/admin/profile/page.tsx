"use client"

import Image from "next/image"
import { MainButton } from "@/components/ButtonComponent"
import Profile from "@/public/images/profile.jpeg"

export default function AdminProfile() {
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
                                className=""
                            />
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row flex-1 gap-8 xl:gap-12">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-5">
                            <InfoItem label="Username" value="@Mhmdz" />
                            <InfoItem label="Full Name" value="Abdul Mohammed" />
                            <InfoItem label="Email" value="abdul@gmail.com" />
                            <InfoItem label="Phone Number" value="+62 1122 890" />
                            <InfoItem label="Role" value="Admin" />
                            <InfoItem label="Created At" value="January, 2-3-2026" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-800 wrap-break-words">{value}</p>
        </div>
    )
}