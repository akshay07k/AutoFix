import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button, Avatar, AvatarImage, AvatarFallback } from "../ui";
import MainNav from "./MainNav";
import { useEffect, useState } from "react";

const Header: React.FC = () => {

  const [UserProfile, setUserProfile] = useState(false);
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
  // console.log(user);

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserProfile(false);
    window.scrollTo(0, 0);
    navigate("/");
  }
  
  

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

        {user ? (<div className="flex items-center gap-6 lg:gap-12 ml-auto">

          <Link to={'/cart'}>
            <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white duration-300 ease-in">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <button
          onClick={() => setUserProfile(!UserProfile)}
          >
          <Avatar className="h-8 w-8">
            <AvatarImage src="./placeholder.svg" alt="User" className="z-10" />
            <AvatarFallback className="z-0">{user.name[0]}</AvatarFallback>
          </Avatar>
          </button>
        </div>)
          :
          (
            <div className="flex items-center gap-6 lg:gap-12 ml-auto">
              <Link to="/login">
                <Button variant="ghost"  className="text-white  duration-300 ease-in bg-gray-600 px-4">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost" className="text-gray-400 hover:text-white duration-300 ease-in">
                  Register
                </Button>
              </Link>
            </div>
          )
        }
      </div>
      
    </header>
    {UserProfile && (
      <div className="fixed top-16 z-50 w-full bg-transprent flex justify-end">
        <div className="w-40 bg-gray-50 shadow-lg rounded-lg border border-gray-200 flex flex-col items-center justify-center ">
          <Link 
          to={'/my-orders'}
          onClick={() => setUserProfile(false)}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-lg focus:outline-none transition duration-200 text-center">
            My Orders
          </Link>
          <button 
          onClick={() => logOut()}
          className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg focus:outline-none transition duration-200">
            Logout
          </button>
        </div>
      </div>    
    )}


  </>
  )
}

export default Header