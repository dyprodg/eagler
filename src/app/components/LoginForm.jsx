"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  // Define state variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Initialize the router for navigation
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign in using next-auth's signIn function
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Check if there's an error in the response and display a message if needed
      if (res.error) {
        setMessage("User email or password incorrect");
        return;
      }

      // Redirect to the '/timeline' page upon successful login
      router.push("/timeline");
    } catch (error) {
      console.log(error);
    }
  };

  // Render the login form
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col bumpup">
        <h1 className="text-2xl text-center mt-5">Login</h1>
        <form
          className="mt-8 m-8 flex flex-col items-start justify-center"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col items-start mb-4">
            Email:
            <input
              className="input"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col items-start mb-8">
            Password:
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="bn13 self-center" type="submit">
            Login
          </button>
          {message && <div className="text-xs p-2">
            <div>
                <a className="text-red-600">{message}</a>
            </div>
              <div>
                  <a href="/reset-password" className="underline">Forgot Password?</a>
              </div>
            </div>
          }
         
        </form>
      </div>
    </div>
  );
};

// Export the LoginForm component
export default LoginForm;
