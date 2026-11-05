import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext.jsx";
import Roulette from "./Roulette.jsx";

export default function GuestRoute() {
    const {isAuth, authLoading} = useUserContext();

    if(authLoading) return <Roulette />

    return isAuth ? < Navigate to="/" replace/>  : < Outlet />
}