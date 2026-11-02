import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import { supabase } from '../supabaseClient.js';

const UserContext = createContext({
    user: null,
    isAuth: false,
    authLoading: true,
    registerHandler() {},
    loginHandler() {},
    logoutHandler() {},
});

export function UserProvider({ children}) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setAuthLoading(false);
        });

        return () => subscription.unsubscribe();
    },[]);

    const registerHandler = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        return data;
    }
    
    const loginHandler = async (email, password) => {
        const { data, error } = await supabase.authsignInWithPassword({
            email,
            password,
        });

        if(error) throw error;

        return data;
    }

    // logout needs callback защото се пресъздава при всеки render на UserProvider-a
    const logoutHandler = useCallback(async () => {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
    },[]);

    const UserContextValues = {
        user,
        isAuth: !!user,
        authLoading,
        registerHandler,
        loginHandler,
        logoutHandler,
    };

    return (
        <UserContext.Provider value={UserContextValues}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}

export default UserContext;

// const UserContext = createContext({
//     isAuth: false,
//     user: {
//         email: '',
//         password: '',
//         _createdOn: '',
//         _id: '',
//         accessToken: '',
//     },
//     registerHandler() {},
//     loginHandler(){},
//     logoutHandler(){},
// });

// export function UserProvider({children}) {
//     const [user, setUser] = usePersistedState(null,'user')
//     const { request } = useReq();

//     const registerHandler = async (email,password) => {

//         const result = await request('/users/register', 'POST',  { email, password })
//         setUser(result);
//         return result;
        
//     };

//     const loginHandler = async (email,password) => {
//         const result = await request('/users/login', 'POST', {email,password})

//         setUser(result);
//     }

//     const logoutHandler = () => {
//         return request('/users/logout', 'GET', null, { 
//             accessToken: user?.accessToken,
//         })
//         .then(() => Navigate('/'))
//         .catch( err => {
//             if(err.status === 403){
//                 alert('Logout failed!');
//                 console.error(err)
//             }
//         })
//         .finally(() => setUser(null))
//     };

//     const UserContextValues = {
//         user,
//         isAuth: !!user?.accessToken,
//         registerHandler,
//         loginHandler,
//         logoutHandler
//     };

//     return (
//         <UserContext.Provider value={UserContextValues}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export function useUserContext() {
//     const contextData = useContext(UserContext)

//     return contextData;
// }

// export default UserContext;