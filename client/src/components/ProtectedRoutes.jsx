import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext.jsx";

export default function ProtectedRoute() {
    const { isAuth } = useUserContext();
    return isAuth ? < Outlet /> : < Navigate to="/login" />
}