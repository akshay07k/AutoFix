import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const sessionUser = sessionStorage.getItem("user");
  const localUser = localStorage.getItem("user");
  const isAuthenticated = !!sessionUser || !!localUser;

  // Debug output to verify
  console.log("Session User:", sessionUser);
  console.log("Local User:", localUser);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
