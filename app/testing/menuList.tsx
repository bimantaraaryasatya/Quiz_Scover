import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

interface IPropMenu {
   id: string,
   path: string,
   label: string,
   icon: ReactNode,
   category: "dashboard" | "communication" | "settings"
}

let MenuList: IPropMenu[] = [
    {
        id: `home`,
        path: `/testing`,
        label: `Home`,
        icon: <FaHome />,
        category: "dashboard"
    },
    {
        id: `daily-quiz`,
        path: `/admin/user`,
        label: `Daily Quiz`,
        icon: <IoDocumentTextOutline/>,
        category: "dashboard"
    },
    {
        id: `quiz-available`,
        path: `/admin/kos`,
        label: `Quiz Available`,
        icon: <IoDocumentTextOutline/>,
        category: "dashboard"
    },
    {
        id: `reports`,
        path: `/admin/book`,
        label: `Reports`,
        icon: <IoDocumentTextOutline/>,
        category: "dashboard"
    },
    {
        id: `message`,
        path: '/admin/review',
        label: 'Message',
        icon: <LuMessageCircleMore/>,
        category: "communication"
    },
    {
        id: `settings`,
        path: '/admin/settings',
        label: 'Settings',
        icon: <IoSettingsOutline/>,
        category: "settings"
    },
]

export default MenuList