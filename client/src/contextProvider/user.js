import React, { createContext, useEffect, useState, useContext } from 'react';

export const UserContext = createContext();
export const UserUpdateContext = createContext()

export function useUserContext() {
    return useContext(UserContext)
}

export function useUserUpdateContext() {
    return useContext(UserUpdateContext)
}

const initialState = {
    isAuth: false,
    id: '',
    username: '',
    email: '',
    currentMatchId: '',
    balance: 0,
    avatar: 'a0',
    cardBack: 'a0',
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