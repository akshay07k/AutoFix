import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

const items = [
  {
    title: "Services",
    href: "/services",
    icon: <ChevronDown className="h-4 w-4 inline-block ml-1" />,
  },
  {
    title: "How it Works",
    href: "/about-us",
  },
  {
    title: "Reviews",
    href: "/reviews",
  },
  {
    title: "Become a Mechanic",
    href: "/mechanic",
  },
]

const MainNav: React.FC<{className?: string}> = ({className}) => {
  return (
    <nav className={cn("flex items-center space-x-8", className)}>
      {items.map((item) => (
        <Link 
          key={item.href} 
          to={item.href} 
          className="text-sm md:text-base text-gray-400 transition-colors hover:text-white duration-300 ease-in flex items-center"
        >
          {item.title}
          {item?.icon}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
