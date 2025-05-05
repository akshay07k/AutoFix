import { Link } from "react-router-dom";
import { Bell, ShoppingBag } from "lucide-react";
import { Button, Avatar, AvatarImage, AvatarFallback } from "../ui";
import MainNav from "./MainNav";
import { useState } from "react";

const Header: React.FC = () => {

  const [UserProfile, setUserProfile] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-black/95 backdrop-blur-sm supports-[backdrop-filter]:bg-black/70 px-4 md:px-16">
      <div className="container flex h-16 items-center gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-extralight tracking-wider text-white">Auto<span className="font-semibold text-blue-500">Fix</span></span>
          </Link>

        </div>

        <MainNav className="ml-16 hidden lg:flex" />

        <div className="flex items-center gap-6 ml-auto">

          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white duration-300 ease-in">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link to={'/cart'}>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white duration-300 ease-in">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping cart</span>
          </Button>
          </Link>

          <button
          onClick={() => setUserProfile(!UserProfile)}
          >
          <Avatar className="h-8 w-8">
            <AvatarImage src="./placeholder.svg" alt="User" className="z-10" />
            <AvatarFallback className="z-0">U</AvatarFallback>
          </Avatar>
          </button>
        </div>
      </div>
      
    </header>
    {UserProfile && (
      <div className="w-full h-16 bg-transparent flex flex-col items-end justify-end z-10 absolute top-[76px]">
        <div className="w-40 bg-gray-50 shadow-lg rounded-lg border border-gray-200 flex flex-col items-center justify-center ">
          <Link 
          to={'/my-orders'}
          onClick={() => setUserProfile(false)}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg focus:outline-none transition duration-200 text-center">
            My Orders
          </Link>
          <button className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg focus:outline-none transition duration-200">
            Logout
          </button>
        </div>
      </div>    
    )}


  </>
  )
}

export default Header
