import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true // withCredentials:true ka matlab hai ki frontend se cookies bhejni allow hai
})

export async function getFeed(){
    const response = await api.get("/post/feed")
    return response.data
}