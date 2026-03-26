import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'

const Feed = () => {
    const { loading, feed, post, handleGetFeed } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    if (loading || !feed) {
        return <main><h1>Feed is Loading...</h1></main>
    }

    return (
        <main className='feed-page'>
            <div className="feed">
                <div className="posts">
                    {feed.map((post, idx) => {
                        return <Post key={idx} post={post} user={post.user} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
