"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectNoSession = (session) => {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session, router]);
};

export default useRedirectNoSession;
