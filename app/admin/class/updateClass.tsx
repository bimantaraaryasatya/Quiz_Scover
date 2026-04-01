"use client"

import { IClasses, ClassProgram } from "@/app/types"
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
import { Select } from "@/components/SelectComponent"

type Props = {
    data: IClasses
    onSuccess: () => void
}

const UpdateClass = ({ data, onSuccess }: Props) => {
    const [isShow, setIsShow] = useState(false)
    const [classes, setClasses] = useState<IClasses>(data)

    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setClasses(data) 
        setIsShow(true)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const url = `${BASE_API_URL}/class/update/${classes.idClass}`

            const payload: any = {
                class_name: classes.class_name
            }

            // hanya kirim kalau ada isi
            if (classes.class_program) {
                payload.class_program = classes.class_program
            }

            const { data: res } = await put(url, payload, TOKEN)

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
                                <strong className="text-2xl">Update Class</strong>
                                <small className="text-slate-400">Edit class data</small>
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
                            id="class_name"
                            type="text"
                            label="Class Name"
                            value={classes.class_name}
                            onChange={(val) =>
                                setClasses({ ...classes, class_name: val })
                            }
                            required
                        />

                        <Select
                            id="class_program"
                            label="Program"
                            value={classes.class_program ?? ""}
                            onChange={(val: any) =>
                                setClasses({
                                    ...classes,
                                    class_program:
                                        val === "" ? null : (val as ClassProgram)
                                })
                            }
                        >
                            <option value="">--- Select Program ---</option>
                            <option value="UTBK">UTBK</option>
                            <option value="SKD">SKD</option>
                        </Select>
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

export default UpdateClass