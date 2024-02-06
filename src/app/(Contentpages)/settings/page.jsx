"use client";

import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


const Settings = () => {
  const { data: session } = useSession();

  //useEffect for redirection in case no user is logged in
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session, router]);


  //component that shows logout button and active user data
  return (
    <div className="flex w-full h-screen flex-col">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p>Username: {session?.user?.username}</p>
        <p>User ID: {session?.user?.id}</p>
        <p>Email: {session?.user?.email}</p>
        <div>
          <a className="button-28" href="/deleteaccount">
            Delete Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;
