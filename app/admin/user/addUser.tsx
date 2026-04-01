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
import { IUser, Role } from "@/app/types"
import { Select } from "@/components/SelectComponent"

type ClassOption = {
    label: string
    value: number
}

const AddUser = ({ onSuccess }: { onSuccess: () => void }) => {
    const [isShow, setIsShow] = useState(false)
    const [classOptions, setClassOptions] = useState<ClassOption[]>([])
    const [user, setUser] = useState<IUser>({
        idUser: 0,
        uuid: "",
        userName: "",
        password: "",
        full_name: "",
        email: "",
        role: Role.STUDENT,
        classId: 0,
        phone_number: "",
        parent_full_name: "",
        parent_phone_number: "",
        created_at: new Date(),
        updated_at: new Date()
    })

    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setUser({
            idUser: 0,
            uuid: "",
            userName: "",
            password: "",
            full_name: "",
            email: "",
            role: Role.STUDENT,
            classId: 0,
            phone_number: "",
            parent_full_name: "",
            parent_phone_number: "",
            created_at: new Date(),
            updated_at: new Date()
        })
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
            const url = `${BASE_API_URL}/user/register`
            const payload = {
                userName: user.userName,
                password: user.password,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                classId: user.classId,
                phone_number: user.phone_number,
                parent_full_name: user.parent_full_name,
                parent_phone_number: user.parent_phone_number
            }
            const { data } = await post(url, payload, TOKEN)

            if (!data?.status) {
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: "toastUser",
                    type: "warning",
                    autoClose: 2000
                })
                return
            }

            setIsShow(false)

            toast(data?.message, {
                hideProgressBar: true,
                containerId: "toastUser",
                type: "success",
                autoClose: 2000
            })

            onSuccess()
        } catch (error: any) {
            console.log(error)
            const message = error?.response?.data?.message || "Something went wrong"
            toast(message, {
                hideProgressBar: true,
                containerId: "toastUser",
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
                    Add User
                </div>
            </MainButton>

            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form ref={formRef} onSubmit={handleSubmit} className="px-8 py-7">
                    
                    {/* HEADER */}
                    <div className="sticky top-0 bg-white pb-5">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="text-2xl">Create User</strong>
                                <small className="text-slate-400">Add new user</small>
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
                            id="user_name"
                            type="text"
                            label="User Name"
                            value={user.userName}
                            onChange={(val) => setUser({ ...user, userName: val })}
                            required
                        />
                        <InputGroupComponent
                            id="password"
                            type="password"
                            label="Password"
                            value={user.password}
                            onChange={(val) => setUser({ ...user, password: val })}
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
                        <Select id="role" label="Role" value={user.role} onChange={(val) => setUser({ ...user, role: val as Role })} required>
                            <option value="">--- Select Role ---</option>
                            <option value="TENTOR">Tentor</option>
                            <option value="STUDENT">Student</option>
                        </Select>
                        <Select
                            id="classId"
                            label="Class"
                            value={String(user.classId)}
                            onChange={(val) => setUser({ ...user, classId: Number(val) })}
                            required
                        >
                            <option value="">--- Select Class ---</option>
                            {classOptions.map((cls) => (
                                <option key={cls.value} value={cls.value}>
                                    {cls.label}
                                </option>
                            ))}
                        </Select>
                        <InputGroupComponent
                            id="phone_number"
                            type="text"
                            label="Phone Number"
                            value={user.phone_number}
                            onChange={(val) => setUser({ ...user, phone_number: val })}
                            required
                        />
                        <InputGroupComponent
                            id="parent_full_name"
                            type="text"
                            label="Parent Full Name"
                            value={user.parent_full_name}
                            onChange={(val) => setUser({ ...user, parent_full_name: val })}
                            required
                        />
                        <InputGroupComponent
                            id="parent_phone_number"
                            type="text"
                            label="Parent Phone Number"
                            value={user.parent_phone_number}
                            onChange={(val) => setUser({ ...user, parent_phone_number: val })}
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

export default AddUser