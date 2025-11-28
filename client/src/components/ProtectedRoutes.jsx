import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService.js";
const ProtectedRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;