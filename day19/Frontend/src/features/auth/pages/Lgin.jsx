import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'



// {
//     ✅ Step 1: User submits form
//     handleSubmit(e)
// ✅ Step 2: Inside handleLogin
//     setLoading(true)

// 👉 This is the key.

//         setLoading(true) triggers a re - render immediately
// React schedules update → component re - renders
// ✅ Step 3: React re - renders component

// Now this runs again:

//     if (loading) {
//         return <h1>Loading...</h1>
//     }

// 👉 Since loading = true, UI switches to:

// Loading...
// ⚠️ Meanwhile(important)

// Your async function is still running:

//     const res = await login(username, password)

// 👉 JS is waiting here, but React already re - rendered UI

// ✅ Step 4: API completes

//     Then:

//     setUser(res.user)
//     setLoading(false)

// 👉 Another re - render happens

// ✅ Step 5: UI updates again

//     Now:

//     loading = false
// }

const Lgin = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { handleLogin, loading, user } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return <h1>Loading...</h1>
    }


    async function handleSubmit(e) {
        e.preventDefault()

        // axios.post("http://localhost:3000/api/auth/login", {
        //     username,
        //     password,
        // }, { withCredentials: true })
        //     .then(res => {
        //         console.log(res.data)
        //     })

        await handleLogin(username, password)
            .then(res => {
                console.log(res)
                navigate("/")
            })

        // setUsername("")
        // setPassword("")
    }


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button className='button primary-button' type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Lgin