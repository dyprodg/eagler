import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import RegisterButton from "./components/RegisterButton";
import Image from "next/image";


// Define an async function named 'Register'
export default async function Register() {
  // Fetch the user session from the server using 'getServerSession'
  const session = await getServerSession(authOptions);

  // If a session exists, redirect the user to the '/timeline' page
  if (session) {
    redirect("/timeline");
    return null;
  } 

  // Render the registration page with components
  return (
    <div className="relative">
      <div className="fixed w-full flex justify-between items-center">
        {/* Render the 'RegisterButton' component */}

        <Image
          className="m-5 hidden md:flex"
          src="/eagler.svg"
          alt="Logo"
          width={50}
          height={50}
          priority
        />

        <RegisterButton />
      </div>
      <div className="fixed top-0 left-0"></div>
      <div>
        {/* Render the 'LoginForm' component */}
        <LoginForm classname="" />
      </div>
    </div>
  );
}
