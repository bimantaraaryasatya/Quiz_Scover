import React from 'react'
import Link from 'next/link'

interface MenuItemProps{
    icon: React.ReactNode;
    label: string;
    path: string;
    active?: boolean;
    collapsed?: boolean
}

const MenuItem = ({ icon, label, path, active, collapsed }: MenuItemProps) => {
  return (
    <Link
      href={path}
      className={`flex items-center font-medium ${collapsed ? "justify-center px-2 py-4" : "justify-start px-4"} py-3 rounded-xl transition duration-200 ease-in-out ${active ? "text-primary bg-primary/10" : "text-gray-700 hover:text-white hover:bg-primary"}`}
    >
      <span className={`${collapsed ? "" : "mr-3"}`}>
        {icon}
      </span>

      {!collapsed && (
        <span className="flex-1">
          {label}
        </span>
      )}
    </Link>
  )
}


export default MenuItem;