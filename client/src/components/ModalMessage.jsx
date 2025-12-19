import { useEffect } from "react";

export default function ModalMessage({ message, type = "info", onClose}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 8000);
        return () => clearTimeout(timer);
    }, [onClose]);
              
    return (
        <div className={`modal ${type}`}>
            {message}            
        </div>
    );
}