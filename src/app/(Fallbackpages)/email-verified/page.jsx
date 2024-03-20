'use client'
import CheckMark from '@/app/components/loaders/checkMark';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EmailVerifiedPage = () => {
    const router = useRouter();

    useEffect(() => {
      const timer = setTimeout(() => {
        router.push(process.env.NEXTAUTH_URL);
      }, 3000);
  
      // Cleanup function to clear the timer if the component unmounts before the redirect happens
      return () => clearTimeout(timer);
    }, [router]);
  
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <h1 className='text-3xl text-shadow'>Email Verified</h1>
            <CheckMark />
            <p>Your email has been successfully verified.</p>
        </div>
    );
};

export default EmailVerifiedPage;