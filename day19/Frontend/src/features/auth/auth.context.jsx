// State Layer for Authentication  
// ye file authentication ke state ko manage krne ke liye hai, isme hum apne authentication se related state aur functions ko define krte hai jise hum apne components me use kr skte hai

import { createContext, useState, useEffect } from "react";
import {register, login, getMe} from "./services/auth.api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    // const handleLogin = async (username, password) => {
    //     setLoading(true)

    //     try {
    //         const res = await login(username, password)
    //         setUser(res.user)
    //     }
    //     catch (err) {
    //         setUser(null)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }

    // const handleRegister = async (username, email, password) => {
    //     setLoading(true)

    //     try {
    //         const res = await register(username, email, password)
    //         setUser(res.user)
    //     }
    //     catch (err) {
    //         setUser(null)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }


    return (
        <AuthContext.Provider value={{ user , setUser, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    )
}
