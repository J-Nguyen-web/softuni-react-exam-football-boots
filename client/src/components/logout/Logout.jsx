import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext.jsx";

export default function Logout() {
    const {logoutHandler} = useContext(UserContext);
    const navigate = useNavigate();
    const {showModal} = useModal();

    useEffect(()=> {
        async function logout() {
            try {
                await logoutHandler();
            } catch (error) {
                showModal(error.message, "error")
            } finally {navigate('/', {replace : true})}
        }
        
        logout();
    },[logoutHandler, navigate])
    
    return null;
}