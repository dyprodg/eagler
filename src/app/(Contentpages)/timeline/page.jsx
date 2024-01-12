'use client'


import { useSession } from "next-auth/react";
import { Post } from "@/app/components/Post";
import Image from "next/image";
import redirectNoSession from "@/lib/nosession"
import { useState } from "react";
import { getLatestPosts } from "@/app/actions";


const Timeline = () => {

    //useEffect for redirection in case no user is logged in
    const { data: session } = useSession();
    redirectNoSession(session)

    const [posts, setPosts] = useState([])
    const [lastPostId, setLastPostId] = useState(null)



    const fetchPosts = async () => {
        try {
            const newPosts = await getLatestPosts(lastPostId);
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            const newLastPostId = newPosts[newPosts.length - 1]?.id;
            if (newLastPostId) {
                setLastPostId(newLastPostId);
            }
        } catch (error) {
            console.error('error loading posts');
        }
    }
    return (
        <div>
             <button
                    className="border border-black mt-32 active:scale-90 hover:scale-105"
                    onClick={fetchPosts}
                >Fetch Posts</button>
            <div className="max-w-[90%] md:mx-32 ml-12">
           
                <div className="flex w-full h-screen flex-col">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                    </div>
                </div> 
            </div>
            
      </div>
    );
    
};

export default Timeline;
