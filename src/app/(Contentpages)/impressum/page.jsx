'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(process.env.NEXTAUTH_URL);
    }, 3000);

    // Cleanup function to clear the timer if the component unmounts before the redirect happens
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex w-full h-screen justify-center items-start">
      <h1 className="text-5xl">Impressum</h1>
      <div className="text-2xl"></div>
    </div>
  );
};

export default page;