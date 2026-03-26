import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import '../style/form.scss'

const Register = () => {

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { handleRegister, loading } = useAuth()
    const navigate = useNavigate()

    if(loading){
        return <main><h1>Loading...</h1></main>
    }

    async function handleSubmit(e){
        e.preventDefault()

        await handleRegister(username, email, password)
        .then(res => {
            console.log(res)
            navigate("/")
        })

        // axios by default cookies nhi bhejta hai isliye hme withCredentials:true krna pdta hai
        // axios.post("http://localhost:3000/api/auth/register",{
        //     username,
        //     email,
        //     password,
        // },{
        //     withCredentials:true // withCredentials:true ka matlab hai ki frontend se cookies bhejni allow hai
        // })
        // .then(res => {
        //     console.log(res.data)
        // })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setEmail(e.target.value) }}
                        type="text"
                        name='email'
                        placeholder='Enter email' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button className='button primary-button' type='submit'>Register</button>
                </form>

                <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register