import { ReactNode } from "react";
import { FiHome } from "react-icons/fi";
import { MdHistory } from "react-icons/md";
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
        icon: <FiHome/>,
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
        id: `history`,
        path: `/tentor/history`,
        label: `History`,
        icon: <MdHistory/>,
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