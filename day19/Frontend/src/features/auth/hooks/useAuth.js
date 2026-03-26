// hook layout
// 1. import useContext and AuthContext
// 2. create a function useAuth that uses useContext to get the context value
// 3. check if context is null and throw an error if it is
// 4. return the context value

import { useContext } from 'react'
import { AuthContext } from '../auth.context.jsx'
import { login, register, getMe } from '../services/auth.api.js'


export const useAuth = () => {

    const context = useContext(AuthContext)

    // if (!context) {
    //     throw new Error('useAuth must be used within an AuthProvider')
    // }

    // return context



    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (username, password) => {
        setLoading(true)

        try {
            const res = await login(username, password)
            setUser(res.user)
        }
        catch (err) {
            setUser(null)
        }
        finally {
            setLoading(false)
        }
    }



    const handleRegister = async (username, email, password) => {
        setLoading(true)

        try {
            const res = await register(username, email, password)
            setUser(res.user)
        }
        catch (err) {
            setUser(null)
        }
        finally {
            setLoading(false)
        }
    }

    return { user, setUser, loading, setLoading, handleLogin, handleRegister }

}