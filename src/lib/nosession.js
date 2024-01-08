'use client'
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const redirectNoSession = (session) => {
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            redirect('/');
        }
    }, [session, router]);

    if (!session) {
        return null;
    }
};

export default redirectNoSession