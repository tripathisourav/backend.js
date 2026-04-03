import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth.context'
import { login, register, getMe, logout } from '../services/auth.api'


export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (identifier, password) => {
        setLoading(true)

        try {
            const res = await login(identifier, password)
            setUser(res.user)
            return res
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

        try{
            const res = await register(username, email, password)
            setUser(res.user)
            return res
        }
        catch(err){
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        setLoading(true)
        const res = getMe()

        console.log(res)
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading(true)

        const res = logout()
        console.log(res);
        
        setLoading(false)
    }

    useEffect(() => {
        handleGetMe()
    }, [])


    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleGetMe, handleLogout }
}