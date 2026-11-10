import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import { supabase } from '../supabaseClient.js';
//todo user name used for greetings on login
const UserContext = createContext({
    user: null,
    isAuth: false,
    authLoading: true,
    registerHandler: async () => {},
    loginHandler: async () => {},
    logoutHandler: async () => {},
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

    const registerHandler = async (email, username, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { // supabase accept it like user.metadata
                data: { username: username.trim() }
            }
        });

        if (error) throw error;

        return data;
    }
    
    const loginHandler = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
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