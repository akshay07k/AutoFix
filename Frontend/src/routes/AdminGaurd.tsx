import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminGuardProps {
    children: ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser || parsedUser.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default AdminGuard;
