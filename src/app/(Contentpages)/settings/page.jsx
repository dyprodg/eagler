'use client'


import redirectNoSession from "@/lib/nosession";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


const Settings = () => {

    const { data: session } = useSession();

    
    //useEffect for redirection in case no user is logged in
    redirectNoSession(session)
 
    //component that shows logout button and active user data
    return (
        <div className="flex w-full h-screen flex-col">
            
            <div className="flex flex-col items-center justify-center flex-grow"> 
                
                <p>Username: {session.user.username}</p> 
                <p>User ID: {session.user.id}</p>
                <p>Email: {session.user.email}</p>
                <div>
                <a className="button-28" href='/deleteaccount'>Delete Account</a>

            </div>
            </div>
            
        </div>
    );
    
};

export default Settings;
