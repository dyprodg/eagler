'use client'


import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoutButton from "../../components/LogoutButton";


const Settings = () => {
    const router = useRouter(); 
    const { data: session } = useSession();
    const [userDetails, setUserDetails] = useState(null)

    
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
        <div className="flex w-full h-screen flex-col">
            
            <div className="flex flex-col items-center justify-center flex-grow"> 
            
                <p>Username: {session.user.username}</p> 
                <p>User ID: {session.user.id}</p>
                <p>Email: {session.user.email}</p>
            </div>
        </div>
    );
    
};

export default Settings;
