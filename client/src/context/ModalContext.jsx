import { useContext } from "react";
import { createContext, useState } from "react";
import { useCallback } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children}) {
    const [modal, setModal] = useState(null);
    
    const showModal = useCallback((message, type = "info") => {
        setModal({ message, type });
        
        setTimeout(() => {
            setModal(null);
        },8000)
    }, []);
    
    const showConfirm = (message, onConfirm) => {
        setModal({
            message,
            type: "confirm",
            onConfirm,
        });
    };

    const closeModal = () => setModal(null);

    return (
        <ModalContext.Provider value={{ showModal, showConfirm }}>
            {children}

            {modal && (
                <div className={`modal ${modal.type}`}>
                    <div className="modal-content">
                        {modal.message}
                    </div>
                    {modal.type === "confirm" && (
                        <div className="modal-actions">
                            <button onClick={() =>{ modal.onConfirm(); closeModal();}}>Yes</button>
                            <button onClick={closeModal}>Dismiss</button>
                    </div>
                    )}
                </div>
            )}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}