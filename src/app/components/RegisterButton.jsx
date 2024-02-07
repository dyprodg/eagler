"use client";

import { useRouter } from "next/navigation";

const RegisterButton = () => {
  // Initialize the router for navigation
  const router = useRouter();

  // Handle register button click to redirect to '/register'
  const handleRegisterButton = () => {
    router.push("/register");
  };

  // Render the register button
  return (
    <div className="flex justify-between">
      <div className="m-4">
        <button onClick={handleRegisterButton} className="button-28">
          Create Account
        </button>
      </div>
    </div>
  );
};

// Export the RegisterButton component
export default RegisterButton;
