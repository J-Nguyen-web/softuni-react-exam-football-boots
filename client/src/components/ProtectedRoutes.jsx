import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext.jsx";
import Roulette from "./Roulette.jsx";

export default function ProtectedRoute() {
    const { isAuth, authLoading } = useUserContext();
    
    if(authLoading) {
        return <Roulette/>
    }
    
    return isAuth ? < Outlet /> : < Navigate to="/login" replace/>
    //replace prevent unauthorized page да остава в history-то
}