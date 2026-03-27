import { getFeed, createPost, likePost, unlikePost } from "../services/post.api";
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

    const handleCreatePost = async(imageFile, caption) => {
        setLoading(true)

        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...feed])
        setLoading(false)
    }

    const handleLikePost = async (postId) => {
        const data = await likePost(postId)
        await handleGetFeed()
    }

    const handleUnlikePost = async (postId) => {
        const data = await unlikePost(postId)
        await handleGetFeed()
    }


    // useEffect(() => {
    //     handleGetFeed()
    // }, [])


    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLikePost, handleUnlikePost };
}