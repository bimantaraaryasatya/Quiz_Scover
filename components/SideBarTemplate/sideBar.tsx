"use client"

import { ReactNode, useState, useEffect } from "react"
import Image from "next/image"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import MenuItem from "./menuItem"
import { useRouter } from "next/navigation"
import ScoverLogo from "@/public/images/scover_logo1.png"
import { getCookie, removeCookie } from "@/lib/client-cookies"
import { jwtDecode } from "jwt-decode"
import { ToastContainer, toast } from "react-toastify"
import { get } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { GiHamburgerMenu } from "react-icons/gi";
import ProfilePicTest from "@/public/images/profile.jpeg"
import { IAdmin } from "@/app/types";

type MenuType = {
  id: string
  icon: ReactNode
  path: string
  label: string
  category: "dashboard" | "communication" | "settings"
}

type ManagerProp = {
  children: ReactNode
  id: string
  title: string
  menuList: MenuType[]    
}

const Sidebar = ({ children, id, title, menuList }: ManagerProp) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [name, setName] = useState("")
  const [admin, setAdmin] = useState<IAdmin | null>(null)
  // const [ownerKos, setOwnerKos] = useState<IKos | null>(null)
  const router = useRouter()

  // useEffect(() => {
  //   let touchStartX = 0
  //   let touchEndX = 0

  //   const handleTouchStart = (e: TouchEvent) => {
  //     touchStartX = e.changedTouches[0].screenX
  //   }

  //   const handleTouchEnd = (e: TouchEvent) => {
  //     touchEndX = e.changedTouches[0].screenX
  //     handleGesture()
  //   }

  //   const handleGesture = () => {
  //     if (touchEndX - touchStartX > 80) {
  //       setIsMobileOpen(true)
  //     }

  //     if (touchStartX - touchEndX > 80) {
  //       setIsMobileOpen(false)
  //     }
  //   }

  //   window.addEventListener("touchstart", handleTouchStart)
  //   window.addEventListener("touchend", handleTouchEnd)

  //   return () => {
  //     window.removeEventListener("touchstart", handleTouchStart)
  //     window.removeEventListener("touchend", handleTouchEnd)
  //   }
  // }, [])

  useEffect(() => {
    const TOKEN = getCookie("token")
    if (!TOKEN) return
    const userName = getCookie("name")
    if (userName) setName(userName)
    try {
      const decoded: IAdmin = jwtDecode(TOKEN)
      setAdmin(decoded)
    } catch (error) {
      console.error("Failed to decode token:", error)
    }
  }, [])

  const handleLogout = () => {
    removeCookie("token")
    removeCookie("id")
    removeCookie("name")
    removeCookie("email")
    removeCookie("role")

    toast("Logout is successful", {
      hideProgressBar: true,
      containerId: "toastSideBar",
      type: "success",
      autoClose: 1000,
    })

    setTimeout(() => router.replace("/login"), 2000)
  }

  const groupedMenu = menuList.reduce((acc, menu) => {
    if (!acc[menu.category]) {
      acc[menu.category] = []
    }
    acc[menu.category].push(menu)
    return acc
  }, {} as Record<string, MenuType[]>)

  return (
    <div className="min-h-screen md:h-screen flex bg-slate-50 ">
      <ToastContainer containerId="toastSideBar" />
      <aside
        className={`
          fixed md:sticky top-0 h-screen
          bg-white border-r border-[#E8E8E8]
          flex flex-col
          transition-all duration-300 z-50
          ${isCollapsed ? "w-20" : "w-72"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* TOP: Logo + Toggle */}
        <div className="p-4">
          <div className={`flex gap-6 ${isCollapsed ? "justify-center, flex-col-reverse" : "justify-between"}`}>
            <div className="flex items-center">
              <Image src={ScoverLogo} alt="Scover Logo" width={50} height={50} />
              {!isCollapsed && (
                <h1 className="ml-2 text-md font-semibold text-text">
                  Scover Malang
                </h1>
              )}
            </div>

            <button
              className="text-gray-500 flex items-center justify-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <IoIosArrowForward className="text-xl text-text" />
              ) : (
                <IoIosArrowBack className="text-xl text-text" />
              )}
            </button>
          </div>
        </div>

        {/* MIDDLE: SCROLLABLE MENU */}
        <div className="flex-1 overflow-y-auto px-4">
          <nav className="mt-6 flex flex-col gap-6 pb-6">
            {Object.entries(groupedMenu).map(([category, menus]) => (
              <div key={category}>
                {!isCollapsed && (
                  <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wider">
                    {category}
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  {menus.map(menu => (
                    <MenuItem
                      key={menu.id}
                      icon={menu.icon}
                      label={!isCollapsed ? menu.label : ""}
                      path={menu.path}
                      active={menu.id === id}
                      collapsed={isCollapsed}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* BOTTOM: LOGOUT (FIXED BAWAH) */}
        <div className="p-4 border-t border-[#E8E8E8]">
          <button
            className="flex justify-center gap-2 px-4 w-full py-2 border rounded-md border-[#E8E8E8] hover:bg-red-50"
            onClick={handleLogout}
          >
            <span className="flex items-center text-xl text-red-500">
              <IoLogOutOutline />
            </span>
            {!isCollapsed && (
              <span className="text-red-500">Logout</span>
            )}
          </button>
        </div>
      </aside>
      {/* RIGHT SIDE WRAPPER */}
      <div className="flex-1 flex flex-col md:h-screen min-w-0">

        {/* HEADER */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-5 md:px-10 h-20 bg-white border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2">
            <button className="text-lg block md:hidden" onClick={() => setIsMobileOpen(true)}>
              <GiHamburgerMenu/>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                {title}
              </h1>
            </div>
          </div>

          {/* Dummy User */}
          <a href="/admin/profile">
            <div className="flex items-center gap-4 px-4 py-2 rounded-xl md:border-2 md:border-primary/70">
              {/* <FaRegUserCircle className="text-2xl md:text-3xl text-gray-600" /> */}
              <img src={ProfilePicTest.src} alt="Profile" className="w-10 h-10 rounded-full" />
              <div className="leading-tight hidden md:block">
                <p className="font-bold text-sm text-gray-800">
                  {name}
                </p>
                <p className="font-medium text-xs text-gray-500">
                  {admin?.role}
                </p>
              </div>
            </div>
          </a>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-5 md:p-10 md:overflow-y-auto">
          {children}
        </main>
      </div>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  )
}

export default Sidebar
