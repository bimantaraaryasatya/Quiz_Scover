"use client"

import { IClasses, ClassProgram } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { drop, put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { FiTrash2 } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"

import { MainButton, SecondButton } from "@/components/ButtonComponent"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/ModalComponent"
import Select from "@/components/SelectComponent"

type Props = {
    data: IClasses
    onSuccess: () => void
}

const DeleteClass = ({ data, onSuccess }: Props) => {
    const [isShow, setIsShow] = useState(false)
    const [classes, setclasses] = useState<IClasses>(data)

    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setclasses(data) 
        setIsShow(true)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const url = `${BASE_API_URL}/class/delete/${classes.idClass}`
            const { data: res } = await drop(url, TOKEN)

            if (!res?.status) {
                toast(res?.message, {
                    hideProgressBar: true,
                    containerId: "toastClass",
                    type: "warning",
                    autoClose: 2000
                })
                return
            }

            setIsShow(false)

            toast(res?.message, {
                hideProgressBar: true,
                containerId: "toastClass",
                type: "success",
                autoClose: 2000
            })

            onSuccess()
        } catch (error: any) {
            console.log(error)

            const message =
                error?.response?.data?.message || "Something went wrong"

            toast(message, {
                hideProgressBar: true,
                containerId: "toastClass",
                type: "error",
                autoClose: 2000
            })
        }
    }

    return (
        <div>
            {/* BUTTON EDIT */}
            <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 hover:cursor-pointer transition" onClick={openModal}>
                <FiTrash2 />
            </button>

            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form ref={formRef} onSubmit={handleSubmit} className="px-8 py-7">

                    {/* HEADER */}
                    <div className="pb-5">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="text-2xl">Delete Class</strong>
                                <small className="text-slate-400">Delete class data</small>
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
                        Are you sure you want to delete class {classes.class_name}
                    </div>

                    {/* FOOTER */}
                    <div className="pt-5">
                        <div className="w-full flex justify-between">
                            <SecondButton
                                type="button"
                                onClick={() => setIsShow(false)}
                            >
                                Cancel
                            </SecondButton>
                            <MainButton type="submit">
                                Delete
                            </MainButton>
                        </div>
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default DeleteClass