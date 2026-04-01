"use client"

import { useRef, useState, FormEvent, useEffect } from "react"
import { BASE_API_URL } from "@/global"
import { get, put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { toast } from "react-toastify"
import { IoMdClose } from "react-icons/io"
import { MainButton, SecondButton } from "@/components/ButtonComponent"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/ModalComponent"
import { IUser, Role } from "@/app/types"
import { Select } from "@/components/SelectComponent"
import { FiEdit } from "react-icons/fi"

type ClassOption = {
    label: string
    value: number
}

type Props = {
    data: IUser | null
    onSuccess: () => void
}

const UpdateUser = ({ data, onSuccess }: Props) => {
    const [isShow, setIsShow] = useState(false)
    const [classOptions, setClassOptions] = useState<ClassOption[]>([])
    const [user, setUser] = useState<IUser | null>(null)

    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    // 🔥 buka modal + isi data
    const openModal = () => {
        if (data) {
            setUser(data)
            setIsShow(true)
        }
    }

    // 🔥 fetch class
    const fetchClasses = async () => {
        try {
            const url = `${BASE_API_URL}/class/allData`
            const { data } = await get(url, TOKEN)

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

    // 🔥 submit update
    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            if (!user) return

            const url = `${BASE_API_URL}/user/update/${user.idUser}`

            const payload = {
                userName: user.userName,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                classId: user.classId,
                phone_number: user.phone_number,
                parent_full_name: user.parent_full_name,
                parent_phone_number: user.parent_phone_number
            }

            const { data } = await put(url, payload, TOKEN)

            if (!data?.status) {
                toast(data?.message, {
                    type: "warning",
                    containerId: "toastUser"
                })
                return
            }

            setIsShow(false)

            toast("User updated successfully", {
                type: "success",
                containerId: "toastUser"
            })

            onSuccess()
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong"

            toast(message, {
                type: "error",
                containerId: "toastUser"
            })
        }
    }

    return (
        <div>
            <button onClick={openModal} className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition hover:cursor-pointer">
                <FiEdit />
            </button>
            

            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                {user && (
                    <form ref={formRef} onSubmit={handleSubmit} className="px-8 py-7">

                        {/* HEADER */}
                        <div className="sticky top-0 bg-white pb-5">
                            <div className="w-full flex items-center">
                                <strong className="text-2xl">Update User</strong>
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
                                id="user_name"
                                type="text"
                                label="User Name"
                                value={user.userName}
                                onChange={(val) => setUser({ ...user, userName: val })}
                                required
                            />
                            <InputGroupComponent
                                id="full_name"
                                type="text"
                                label="Full Name"
                                value={user.full_name}
                                onChange={(val) => setUser({ ...user, full_name: val })}
                                required
                            />
                            <InputGroupComponent
                                id="email"
                                type="email"
                                label="Email"
                                value={user.email}
                                onChange={(val) => setUser({ ...user, email: val })}
                                required
                            />

                            <Select
                                id="role"
                                label="Role"
                                value={user.role}
                                onChange={(val) => setUser({ ...user, role: val as Role })}
                            >
                                <option value="ADMIN">Admin</option>
                                <option value="TENTOR">Tentor</option>
                                <option value="STUDENT">Student</option>
                            </Select>

                            <Select
                                id="classId"
                                label="Class"
                                value={String(user.classId)}
                                onChange={(val) => setUser({ ...user, classId: Number(val) })}
                            >
                                {classOptions.map((cls) => (
                                    <option key={cls.value} value={cls.value}>
                                        {cls.label}
                                    </option>
                                ))}
                            </Select>

                            <InputGroupComponent
                                id="phone"
                                type="text"
                                label="Phone"
                                value={user.phone_number}
                                onChange={(val) => setUser({ ...user, phone_number: val })}
                            />

                            <InputGroupComponent
                                id="parent_name"
                                type="text"
                                label="Parent Name"
                                value={user.parent_full_name}
                                onChange={(val) => setUser({ ...user, parent_full_name: val })}
                            />

                            <InputGroupComponent
                                id="parent_phone"
                                type="text"
                                label="Parent Phone"
                                value={user.parent_phone_number}
                                onChange={(val) => setUser({ ...user, parent_phone_number: val })}
                            />
                        </div>

                        {/* FOOTER */}
                        <div className="pt-5 flex justify-between">
                            <SecondButton type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </SecondButton>
                            <MainButton type="submit">
                                Update
                            </MainButton>
                        </div>

                    </form>
                )}
            </Modal>
        </div>
    )
}

export default UpdateUser