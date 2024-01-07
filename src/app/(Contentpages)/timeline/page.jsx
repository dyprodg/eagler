'use client'


import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect} from 'react';
import { Post } from "@/app/components/Post";
import Image from "next/image";


const Timeline = () => {
    const router = useRouter(); 
    const { data: session } = useSession();

    const fakePosts = Array.from({ length: 30 }, (_, index) => ({
        id: index,
        image: `https://via.placeholder.com/150?text=Post+${index + 1}`, // Beispiel-URL für Bilder
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50),
      }));

      
    //useEffect for redirection in case no user is logged in
    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);
    if (!session) {
        return null; 
    }
 
    //component that shows logout button and active user data
    return (
        <div>
            <Image 
                className="m-5"
                src='/eagler.svg'
                alt="Logo"
                width={50}
                height={50}
            />
            <div className="max-w-[90%] md:mx-32 mx-12">
                <div className="flex w-full h-screen flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {fakePosts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                    </div>
                </div> 
            </div>
            
      </div>
    );
    
};

export default Timeline;
