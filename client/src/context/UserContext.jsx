import { createContext, useContext, useState } from "react";
import useReq from "../hooks/useReq.js";
import usePersistedState from "../hooks/usePersistedState.js";
import { Navigate } from "react-router-dom";

const UserContext = createContext({
    isAuth: false,
    user: {
        email: '',
        password: '',
        _createdOn: '',
        _id: '',
        accessToken: '',
    },
    registerHandler() {},
    loginHandler(){},
    logoutHandler(){},
});

export function UserProvider({children}) {
    const [user, setUser] = usePersistedState(null,'user')
    const { request } = useReq();

    const registerHandler = async (email,password) => {

        const result = await request('/users/register', 'POST',  { email, password })
        setUser(result);
        return result;
        
    };

    const loginHandler = async (email,password) => {
        const result = await request('/users/login', 'POST', {email,password})

        setUser(result);
    }

    const logoutHandler = () => {
        return request('/users/logout', 'GET', null, { 
            accessToken: user?.accessToken,
        })
        .then(() => Navigate('/'))
        .catch( err => {
            if(err.status === 403){
                alert('Logout failed!');
                console.error(err)
            }
        })
        .finally(() => setUser(null))
    };

    const UserContextValues = {
        user,
        isAuth: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler
    };

    return (
        <UserContext.Provider value={UserContextValues}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const contextData = useContext(UserContext)

    return contextData;
}

export default UserContext;