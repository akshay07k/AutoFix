import React from 'react'
import {
    LayoutDashboard,
    UserCog,
    ShoppingCart,
    Settings,
    ChevronDown,
    X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isSidebarCollapsed: boolean;
  isSidebarOpen: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
}



const SideBar: React.FC<SidebarProps> = ({isSidebarCollapsed, isSidebarOpen, setIsSidebarCollapsed, setIsSidebarOpen}) => {
  return (
    <>
        <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        flex flex-col
        w-64 lg:w-auto
        bg-white border-r border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <h1 className={`font-bold text-xl text-gray-900 ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
                Admin Panel
            </h1>
            <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
                <X className="h-5 w-5" />
            </button>
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100"
            >
                <ChevronDown 
                className={`h-5 w-5 transform transition-transform duration-200 ${isSidebarCollapsed ? 'rotate-180' : ''}`}
                />
            </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
            {[
                { icon: LayoutDashboard, label: 'Dashboard' },
                { icon: UserCog, label: 'Mechanics' },
                { icon: ShoppingCart, label: 'Orders' },
                { icon: Settings, label: 'Settings' },
            ].map((item, index) => (
                <NavLink
                key={index}
                to={`${item.label.toLowerCase()}`}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                <item.icon className={`h-5 w-5 ${!isSidebarCollapsed && 'lg:mr-3'}`} />
                <span className={`${isSidebarCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                </NavLink>
            ))}
            </nav>
        </aside>
    </>
  )
}

export default SideBar