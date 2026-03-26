import { getFeed } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context.jsx";


export const usePost = () => {
    const { loading, setLoading, post, setPost, feed, setFeed } = useContext(PostContext);

    const handleGetFeed = async () => {
        setLoading(true)
        try {
            const data = await getFeed()
            setFeed(data.posts)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, feed, post, handleGetFeed };
}