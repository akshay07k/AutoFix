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
import OrderHistory from "../components/book/OrderHistory";
import ThankYou from "../components/book/Thankyou";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import MechanicProfile from "../admin/pages/MechanicProfile";
import AddMechanic from "../admin/pages/AddMechanic";
import AdminGuard from "./AdminGaurd";
import HowItWorks from "../pages/HowItWorks";

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
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Signup />
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
            },
            {
                path: "my-orders",
                element: <OrderHistory />
            },
            {
                path: "order-confirmed/:orderId",
                element: <ThankYou />
            }, 
            {
                path: "how-it-works",
                element: <HowItWorks />
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <AdminGuard>
                <Admin />
            </AdminGuard>
        ),
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
                path: "mechanic/:mechanicId",
                element: <MechanicProfile />
            },
            {
                path: "add-mechanic/:id?",
                element: <AddMechanic />
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