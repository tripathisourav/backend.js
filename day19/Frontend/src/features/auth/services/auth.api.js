// API Layer, ye file frontend ke liye hai, jisme hum apne backend ke endpoints ke functions banayenge jise hum apne components me use kr skte hai

// ye file backend se communiicate krne ke liye hai related to authentication, isme hum apne backend ke endpoints ke functions banayenge jise hum apne components me use kr skte hai 
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true // withCredentials:true ka matlab hai ki frontend se cookies bhejni allow hai
})


export async function register(username, email, password) {
    // axios by default data ko set nhi krta cookies mein iske liye hme credentials:true set krna pdta hai
    try {
        const res = await api.post('/register', {
            username,
            email,
            password
        })
        return res.data
    }
    catch (err) {
        throw err
    }
}


export async function login(username, password) {
    try {
        const res = await api.post('/login', {
            username,
            password
        })  
        return res.data
    }
    catch (err) {
        throw err
    }
}


export async function getMe() {
    try {
        const res = await api.get('/get-me')
        return res.data
    }
    catch (err) {
        throw err
    }
}

// export async function logout() {
//     try {
//         const res = await api.post('/logout')
//         return res.data
//     }
//     catch (err) {
//         throw err
//     }
// }