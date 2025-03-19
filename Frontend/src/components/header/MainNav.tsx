import React, {  } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

const items = [
  {
    title: "Services",
    href: "/services",
    icon: <ChevronDown className="h-4 w-4 inline-block ml-1" />,
    hasDropdown: true,
  },
  {
    title: "How it Works",
    href: "#about-us",
  },
  {
    title: "Reviews",
    href: "#reviews",
  },
  {
    title: "Become a Mechanic",
    href: "/mechanic",
  },
];

// const services = [
//   {
//     title: "Oil Changes",
//     href: "/services/oil-change",
//   },
//   {
//     title: "Wash & Detail",
//     href: "/services/car-wash",
//   },
//   {
//     title: "Brake Services",
//     href: "/services/brake-service",
//   },
//   {
//     title: "Tire Services",
//     href: "/services/tire-service",
//   },
//   {
//     title: "Consultation",
//     href: "/services/consultation",
//   },
// ];

const MainNav: React.FC<{ className?: string }> = ({ className }) => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className={cn("flex items-center space-x-8 relative", className)}>
      {items.map((item, index) =>
        item.hasDropdown ? (
          <div
            key={index}
            className="relative py-2"
            // onMouseEnter={() => setIsDropdownOpen(true)}
            // onMouseLeave={() => setTimeout(() => setIsDropdownOpen(false), 300)}
          >
            <NavLink
              to={item.href}
              className={({isActive}) => `${isActive ? "text-blue-500 font-semibold" : "text-gray-200 hover:text-white"} text-sm md:text-base transition-all  duration-300 ease-in-out flex items-center `}
            >
              {item.title} {item?.icon}
            </NavLink>
            {/* {isDropdownOpen && (
              <div className="absolute left-0 top-4/5 mt-2 w-48 bg-black/60 backdrop:backdrop-blur shadow-lg rounded-lg">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.href}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-blue-500/75 transition-colors duration-300 ease-in"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )} */}
          </div>
        ) : (
          <Link
            key={item.href}
            to={item.href}
            className="text-sm md:text-base text-gray-200 transition-colors hover:text-white duration-300 ease-in"
          >
            {item.title}
          </Link>
        )
      )}
    </nav>
  );
};

export default MainNav;
