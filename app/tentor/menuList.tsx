import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md"
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
        path: `/tentor/home`,
        label: `Home`,
        icon: <FaHome />,
        category: "dashboard"
    },
    {
        id: `quiz`,
        path: `/tentor/quiz`,
        label: `Quiz`,
        icon: <MdOutlineQuiz/>,
        category: "dashboard"
    },
    {
        id: `quiz-reports`,
        path: `/tentor/quiz-reports`,
        label: `Quiz Reports`,
        icon: <IoDocumentTextOutline/>,
        category: "dashboard"
    },
    {
        id: `message`,
        path: '/tentor/message',
        label: 'Message',
        icon: <LuMessageCircleMore/>,
        category: "communication"
    },
    {
        id: `settings`,
        path: '/tentor/settings',
        label: 'Settings',
        icon: <IoSettingsOutline/>,
        category: "settings"
    },
]

export default MenuList