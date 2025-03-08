import React from 'react'
import {
  Bell,
  Search,
  Menu
} from 'lucide-react';

interface HeaderProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
}


const NavBar: React.FC<HeaderProps> = ({isSearchOpen, setIsSearchOpen, setIsSidebarOpen}) => {
  return (
    <>
        <header className="bg-white border-b border-gray-200 z-10">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center flex-1">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 ml-2 lg:hidden"
              >
                <Search className="h-5 w-5" />
              </button>
              <div className={`
                absolute top-16 left-0 right-0 bg-white p-4 border-b border-gray-200
                lg:static lg:border-none lg:p-0 lg:bg-transparent lg:flex lg:w-96
                ${isSearchOpen ? 'block' : 'hidden lg:block'}
              `}>
                <div className="flex items-center w-full bg-gray-100 rounded-lg px-4 py-2">
                  <Search className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 bg-transparent border-none focus:outline-none w-full text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-medium text-sm hidden sm:block">Admin User</span>
              </div>
            </div>
          </div>
        </header>
    </>
  )
}

export default NavBar