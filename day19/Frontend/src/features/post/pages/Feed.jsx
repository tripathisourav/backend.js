import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {
    const { loading, feed, post, handleGetFeed, handleLikePost, handleUnlikePost } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    if (loading || !feed) {
        return <main><h1>Feed is Loading...</h1></main>
    }

    return (
        <main className='feed-page'>
            <Nav/>
            <div className="feed">
                <div className="posts">
                    {feed.map((post, idx) => {
                        return <Post key={idx} post={post} user={post.user} loading={loading} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
