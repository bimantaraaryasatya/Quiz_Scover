"use client"

import { ISubject } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { FiEdit } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"
import { MainButton, SecondButton } from "@/components/ButtonComponent"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/ModalComponent"

type Props = {
    data: ISubject
    onSuccess: () => void
}

const UpdateSubject = ({ data, onSuccess }: Props) => {
    const [isShow, setIsShow] = useState(false)
    const [subject, setSubject] = useState<ISubject>(data)

    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setSubject(data) 
        setIsShow(true)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const url = `${BASE_API_URL}/subject/update-data/${subject.idSubject}`

            const payload: any = {
                subject_name: subject.subject_name
            }

            const { data: res } = await put(url, payload, TOKEN)

            if (!res?.status) {
                toast(res?.message, {
                    hideProgressBar: true,
                    containerId: "toastSubject",
                    type: "warning",
                    autoClose: 2000
                })
                return
            }

            setIsShow(false)

            toast(res?.message, {
                hideProgressBar: true,
                containerId: "toastSubject",
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
                containerId: "toastSubject",
                type: "error",
                autoClose: 2000
            })
        }
    }

    return (
        <div>
            {/* BUTTON EDIT */}
            <button
                onClick={openModal}
                className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition hover:cursor-pointer"
            >
                <FiEdit />
            </button>

            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form ref={formRef} onSubmit={handleSubmit} className="px-8 py-7">

                    {/* HEADER */}
                    <div className="pb-5">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="text-2xl">Update Subject</strong>
                                <small className="text-slate-400">Edit subject data</small>
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
                            value={subject.subject_name}
                            onChange={(val) =>
                                setSubject({ ...subject, subject_name: val })
                            }
                            required
                        />
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
                                Update
                            </MainButton>
                        </div>
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default UpdateSubject