import React, { createContext, useEffect, useState, useContext } from 'react';

export const UserContext = createContext();
export const UserUpdateContext = createContext()

export function useUserContex() {
    return useContext(UserContext)
}

export function useUserUpdateContex() {
    return useContext(UserUpdateContext)
}

const initialState = {
    isAuth: false,
    id: '',
    username: '',
    email: '',
    currentMatchId: '',
}

const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState(initialState);

    useEffect(() => {
        // TODO: Check if HTTP cookie exists and is valid
    }, [])

    return (
        <UserContext.Provider value={userState}>
            <UserUpdateContext.Provider value={setUserState}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )

}

export { UserProvider }