import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { Home } from "../components";
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