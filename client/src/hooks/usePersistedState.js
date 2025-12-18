import { useState } from "react";

export default function usePersistedState(initialState, key) {
    const [state, setState] = useState (() => {
        const dataStorage = localStorage.getItem(key);
        
        if (!dataStorage) {
            return initialState;
        }

        const data = JSON.parse(dataStorage);

        return data;
    });

    const setPersistedState = (input) => {
        let value = input;

        if (typeof input === 'function') {
            value = input(state)
        }

        localStorage.setItem(key, JSON.stringify(value))
        setState(value)
    }
    return [
        state,
        setPersistedState,
    ];
}