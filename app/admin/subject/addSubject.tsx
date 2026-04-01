"use client"

import { useRef, useState, FormEvent, useEffect } from "react"
import { BASE_API_URL } from "@/global"
import { get, post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { toast } from "react-toastify"
import { FaPlus } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { MainButton, SecondButton } from "@/components/ButtonComponent"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/ModalComponent"
import { MultiSelect } from "@/components/SelectComponent"

type ClassOption = {
    label: string
    value: number
}

const AddSubject = ({ onSuccess }: { onSuccess: () => void }) => {
    const [isShow, setIsShow] = useState(false)
    const [subjectName, setSubjectName] = useState("")
    const [selectedClasses, setSelectedClasses] = useState<number[]>([])
    const [classOptions, setClassOptions] = useState<ClassOption[]>([])

    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setSubjectName("")
        setSelectedClasses([])
        setIsShow(true)
        if (formRef.current) formRef.current.reset()
    }

    const fetchClasses = async () => {
        try {
            const token = getCookie("token")
            const url = `${BASE_API_URL}/class/allData`
            const { data } = await get(url, token)

            if (data.status) {
                const mapped = data.data.map((cls: any) => ({
                    label: cls.class_name,
                    value: cls.idClass
                }))
                setClassOptions(mapped)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (isShow) fetchClasses()
    }, [isShow])

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            if (selectedClasses.length === 0) {
                toast("Select at least 1 class!", {
                    type: "warning",
                    containerId: "toastSubject",
                    autoClose: 2000
                })
                return
            }

            const url = `${BASE_API_URL}/subject/create`

            const payload = {
                subject_name: subjectName,
                classId: selectedClasses
            }

            const { data } = await post(url, payload, TOKEN)

            if (!data?.status) {
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: "toastSubject",
                    type: "warning",
                    autoClose: 2000
                })
                return
            }

            setIsShow(false)

            toast(data?.message, {
                hideProgressBar: true,
                containerId: "toastSubject",
                type: "success",
                autoClose: 2000
            })

            onSuccess()
        } catch (error: any) {
            console.log(error)
            const message = error?.response?.data?.message || "Something went wrong"

            toast(message, {
                hideProgressBar: true,
                containerId: "toastSubject",
                type: "error",
                autoClose: 2000
            })
        }
    }

    return (
        <div>
            <MainButton type="button" onClick={openModal}>
                <div className="flex items-center gap-2">
                    <FaPlus />
                    Add Subject
                </div>
            </MainButton>

            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form ref={formRef} onSubmit={handleSubmit} className="px-8 py-7">
                    
                    {/* HEADER */}
                    <div className="sticky top-0 bg-white pb-5">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="text-2xl">Create Subject</strong>
                                <small className="text-slate-400">Add new subject</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" onClick={() => setIsShow(false)}>
                                    <IoMdClose />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div>
                        <InputGroupComponent
                            id="subject_name"
                            type="text"
                            label="Subject Name"
                            value={subjectName}
                            onChange={(val) => setSubjectName(val)}
                            required
                        />

                        <MultiSelect
                            id="class"
                            label="Class"
                            value={selectedClasses}
                            onChange={setSelectedClasses}
                            options={classOptions}
                            required
                        />
                    </div>

                    {/* FOOTER */}
                    <div className="pt-5">
                        <div className="w-full ml-auto flex justify-between gap-2">
                            <SecondButton type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </SecondButton>
                            <MainButton type="submit">
                                Save
                            </MainButton>
                        </div>
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default AddSubject