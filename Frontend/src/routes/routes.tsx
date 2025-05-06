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
import MyOrders from "../components/book/MyOrders";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ProtectedRoute from "./ProtectedRoute"; // <-- Import your protected route

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
        element: (
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        )
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
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
        element: <Navigate to={"dashboard"} replace />
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
]);
