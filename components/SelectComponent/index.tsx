"use client"

import { ReactNode } from "react"
import { IoIosArrowDown } from "react-icons/io";

type Props = {
    value: string
    onChange: (value: string) => void
    className?: string
    id: string
    required?: boolean
    children: ReactNode
    label?: string
}

const Select = ({value, onChange, className, id, required, children, label}: Props) => {
    return (
        <div className="flex flex-col my-2 gap-1">
            {
                label ?
                    <label className="text-xs font-medium text-gray-500">
                        {label}
                        {required == true ? <sup className="text-red-600"></sup> : <></>}
                    </label> :
                    <></>
            }
            <div className="relative">
                <select id={id} value={value} onChange={e => onChange(e.target.value)} required={required || false} className={`appearance-none text-sm w-full rounded-md p-2 bg-white border border-black/10 focus:outline-none px-4 py-2.5 ${className}`}>
                    {children}
                </select>
                
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 ">
                    <IoIosArrowDown />
                </div>
            </div>
        </div>
    )
}

export default Select