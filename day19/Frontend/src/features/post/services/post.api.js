import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true // withCredentials:true ka matlab hai ki frontend se cookies bhejni allow hai
})

export async function getFeed(){
    const response = await api.get("/post/feed")
    return response.data
}

export async function createPost(file, caption){

    const formData = new FormData()

    formData.append('Img', file)
    formData.append('caption', caption)

    const response = await api.post("/post", formData)
    return response.data
}

export async function likePost(postId){
    const response = await api.post(`/post/like/${postId}`)
    return response.data
}

export async function unlikePost(postId){
    const response = await api.post(`/post/unlike/${postId}`)
    return response.data
}