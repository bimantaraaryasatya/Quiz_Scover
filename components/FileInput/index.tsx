"use client"

import React, { useState, useRef } from "react"
import { toast } from "react-toastify"

type Props = {
    disabled?: boolean,
    acceptTypes: string[],
    onChange: (file: File | null) => void,
    className?: string,
    required: boolean,
    id?: string,
    label?: string,
    maxSize?: number
}

const FileInput = (props: Props) => {
    const [fileName, setFileName] = useState("No file chosen")
    const inputRef = useRef<HTMLInputElement>(null)
    const limitSize = props.maxSize
    const acceptTypes = props.acceptTypes.join()

    const handleFileInput = (
        event: React.ChangeEvent<HTMLInputElement>,
        callback: (data: File | null) => void
    ): void => {
        const target = event.target;

        if (!target.files || target.files.length === 0) {
            setFileName("No file chosen")
            toast("No file selected", {
                containerId: "toastUser",
                type: "warning",
                autoClose: 2000
            })
            callback(null)
            return
        }

        let currentFile: File = target.files[0]
        setFileName(currentFile.name)

        if (!props.acceptTypes.includes(currentFile.type)) {
            target.value = ""
            setFileName("No file chosen")

            toast(
                `'${currentFile.type}' is invalid. Allowed: ${acceptTypes}`,
                {
                    containerId: "toastUser",
                    type: "warning",
                    autoClose: 2000
                }
            )

            callback(null)
            return
        }

        if (limitSize && currentFile.size > limitSize) {
            target.value = ""
            setFileName("No file chosen")

            toast("File size is too large", {
                containerId: "toastUser",
                type: "warning",
                autoClose: 2000
            })

            callback(null)
            return
        }

        callback(currentFile)
    }

    const handleButtonClick = () => {
        if (inputRef.current && !props.disabled) {
            inputRef.current.click()
        }
    }

    return (
        <div className="w-full flex flex-col gap-1 my-2">
            {props.label && (
                <strong className="text-xs font-bold text-slate-500">
                    {props.label}
                </strong>
            )}

            <input
                type="file"
                className="hidden"
                disabled={props.disabled}
                accept={acceptTypes}
                id={props.id}
                ref={inputRef}
                onChange={e => handleFileInput(e, props.onChange)}
            />

            <button
                type="button"
                onClick={handleButtonClick}
                disabled={props.disabled}
                className={`px-4 py-2 bg-primary text-white rounded-md hover:cursor-pointer ${
                    props.disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Choose File
            </button>

            <span className="mt-1 text-sm text-gray-700">{fileName}</span>
        </div>
    )
}

export default FileInput