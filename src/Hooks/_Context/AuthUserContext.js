import { FIREBASE_userIsLogged } from "../../Helpers/FIREBASE/Actions/UserFirebase";
import { useState, createContext, useEffect } from "react";

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {

    const [useUserLoggedData, setUserLoggedData] = useState({
        isLoading: true,
        data: {}
    });

    useEffect(() => {
        FIREBASE_userIsLogged(setUserLoggedData);
    }, []);


    return <AuthUserContext.Provider
        value={{
            useUserLoggedData
        }}
    >
        {children}

    </AuthUserContext.Provider>;
}