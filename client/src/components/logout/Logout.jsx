import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const {logoutHandler} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=> {
        logoutHandler()
        .finally(() => navigate('/'))
    },[logoutHandler, navigate])
    

    return null;
}