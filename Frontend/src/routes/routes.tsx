import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { 
    Home, 
    OilChange, 
    AllServices,
    Services,
    Brake,
    Wash,
    Battery,
    Consultation,
    Cart,
    Booking
 } from "../components";
import ErrorPage from "../pages/ErrorPage";
import { Admin, Dashboard, Mechanics, Orders } from "../admin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "book",
                element: <Booking />
            },
            {
                path: "services",
                element: <Services />,
                children: [
                    {
                        path: "",
                        element: <AllServices />
                    },
                    {
                        path: "oil-change",
                        element: <OilChange />
                    },
                    {
                        path: "battery-replacement",
                        element: <Battery />
                    },
                    {
                        path: "brakes-replacement",
                        element: <Brake />
                    },
                    {
                        path: "car-wash",
                        element: <Wash />
                    },
                    {
                        path: "consultation",
                        element: <Consultation />
                    }
                ]
            },
            {
                path: "cart",
                element: <Cart />
            }
        ]
    },
    {
        path: "/admin",
        element: <Admin />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Navigate to={"dashboard"} replace/>
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "mechanics",
                element: <Mechanics />
            },
            {
                path: "orders",
                element: <Orders />
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }

])