import { Link } from "react-router-dom";
import { Search, Bell, ShoppingBag } from "lucide-react";
import { Input, Button, Avatar, AvatarImage, AvatarFallback } from "../ui";
import MainNav from "./MainNav";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/50 px-4 md:px-16">
      <div className="container flex h-16 items-center gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold tracking-wider text-white">Auto Fix</span>
          </Link>

        </div>

        <MainNav className="mx-6 hidden lg:flex" />

        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden sm:flex relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-9 bg-gray-900 border-gray-800 text-white duration-300 ease-in placeholder:text-gray-400 focus:ring-blue-500"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white duration-300 ease-in">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white duration-300 ease-in">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping cart</span>
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="./placeholder.svg" alt="User" className="z-10" />
            <AvatarFallback className="z-0">U</AvatarFallback>
          </Avatar>

        </div>
      </div>
    </header>
  )
}

export default Header
