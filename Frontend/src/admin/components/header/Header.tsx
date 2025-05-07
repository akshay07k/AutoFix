import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui';
import { useNavigate } from 'react-router-dom';
// import {
//   Bell,
//   Search,
//   Menu
// } from 'lucide-react';

interface HeaderProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
}


const NavBar: React.FC<HeaderProps> = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }, []);

    const logOut = () => {
      localStorage.removeItem("user");
      setUser(null);
      window.scrollTo(0, 0);
      navigate("/");
    }

  return (
    <>
        <header className="bg-white border-b border-gray-200 z-10">
          <div className="flex h-16 items-center justify-end px-4 lg:px-6">
            {/* <div className="flex items-center flex-1">
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
            </div> */}
            <div className="flex items-center space-x-4 mr-8">
              {/* <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button> */}
              <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="./placeholder.svg" alt="User" className="z-10" />
                <AvatarFallback className="z-0">{user?.name[0]}</AvatarFallback>
              </Avatar>
                <span className="font-medium text-sm ">{user?.name}</span>
              </div>
              <div className='mx-4'>
                <button
                 className='text-red-600 font-medium text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition duration-300 ease-in-out'
                 onClick={() => logOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
    </>
  )
}

export default NavBar