"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { IoIosArrowDown } from "react-icons/io";

type Option = {
    label: string
    value: number
}

type Props = {
    value: string
    onChange: (value: string) => void
    className?: string
    id: string
    required?: boolean
    children: ReactNode
    label?: string
}

type MultiSelectProps = {
    value: number[]
    onChange: (value: number[]) => void
    options: Option[]
    className?: string
    id: string
    required?: boolean
    label?: string
}

export const Select = ({value, onChange, className, id, required, children, label}: Props) => {
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

export const MultiSelect = ({ value, onChange, options, className, id, required, label }: MultiSelectProps) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleValue = (val: number) => {
        if (value.includes(val)) {
            onChange(value.filter(v => v !== val))
        } else {
            onChange([...value, val])
        }
    }

    const selectedLabels = options
        .filter(opt => value.includes(opt.value))
        .map(opt => opt.label)

    return (
        <div className="flex flex-col my-2 gap-1" ref={ref}>
            {label && (
                <label className="text-xs font-medium text-gray-500">
                    {label}
                    {required && <sup className="text-red-600">*</sup>}
                </label>
            )}

            <div className="relative">
                <div
                    onClick={() => setOpen(!open)}
                    className={`cursor-pointer text-sm w-full rounded-md bg-white border border-black/10 px-4 py-2.5 flex justify-between items-center ${className}`}
                >
                    <span className="truncate">
                        {selectedLabels.length > 0
                            ? selectedLabels.join(", ")
                            : "Select options"}
                    </span>

                    <IoIosArrowDown
                        className={`transition-transform ${
                            open ? "rotate-180" : ""
                        }`}
                    />
                </div>

                {/* Dropdown */}
                {open && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-black/10 rounded-md shadow-md max-h-60 overflow-auto">
                        {options.map(opt => (
                            <label
                                key={opt.value}
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={value.includes(opt.value)}
                                    onChange={() => toggleValue(opt.value)}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}