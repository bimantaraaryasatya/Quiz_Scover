import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { MdOutlineQuiz } from "react-icons/md";
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
        path: `/student/home`,
        label: `Home`,
        icon: <FaHome />,
        category: "dashboard"
    },
    {
        id: `daily-quiz`,
        path: `/student/daily-quiz`,
        label: `Daily Quiz`,
        icon: <SlCalender/>,
        category: "dashboard"
    },
    {
        id: `quiz-available`,
        path: `/student/quiz-available`,
        label: `Quiz Available`,
        icon: <MdOutlineQuiz/>,
        category: "dashboard"
    },
    {
        id: `quiz-reports`,
        path: `/student/quiz-reports`,
        label: `Quiz Reports`,
        icon: <IoDocumentTextOutline/>,
        category: "dashboard"
    },
    {
        id: `message`,
        path: '/student/message',
        label: 'Message',
        icon: <LuMessageCircleMore/>,
        category: "communication"
    },
    {
        id: `settings`,
        path: '/student/settings',
        label: 'Settings',
        icon: <IoSettingsOutline/>,
        category: "settings"
    },
]

export default MenuList