import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md"
import { GoPeople } from "react-icons/go";
import { MdOutlineClass } from "react-icons/md";
import { GoBook } from "react-icons/go";
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
        path: `/admin/home`,
        label: `Home`,
        icon: <FaHome />,
        category: "dashboard"
    },
    {
        id: `user`,
        path: `/admin/user`,
        label: `User`,
        icon: <GoPeople/>,
        category: "dashboard"
    },
    {
        id: `quiz`,
        path: `/admin/quiz`,
        label: `Quiz`,
        icon: <MdOutlineQuiz/>,
        category: "dashboard"
    },
    {
        id: `class`,
        path: `/admin/class`,
        label: `Class`,
        icon: <MdOutlineClass/>,
        category: "dashboard"
    },
    {
        id: `subject`,
        path: `/admin/subject`,
        label: `Subject`,
        icon: <GoBook/>,
        category: "dashboard"
    },
    {
        id: `quiz-reports`,
        path: `/admin/quiz-reports`,
        label: `Quiz Reports`,
        icon: <IoDocumentTextOutline/>,
        category: "dashboard"
    },
    {
        id: `message`,
        path: '/admin/message',
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