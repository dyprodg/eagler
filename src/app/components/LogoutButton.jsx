'use client'; 

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

//atm not in use because of layoutchange

const LogoutButton = () => {
    // Initialize the router for navigation
    const router = useRouter();

    // Handle logout button click
    const  handleLogoutButton = async () => {
        // Call the signOut function from next-auth with redirect set to false
        await signOut({ redirect: false });
        // Redirect to the root ('/') page after logout
        router.push('/');
    }

    // Render the logout button
    return (
        <div className="flex justify-between">
            <div className="m-4">
                <button 
                    onClick={handleLogoutButton}
                    className="button-28">
                    Logout
                </button>
            </div>
        </div>
    )
}

// Export the LogoutButton component
export default LogoutButton;
