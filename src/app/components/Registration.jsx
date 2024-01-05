'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckMark from "@/app/components/checkMark";
import RegistrationForm from "./RegistrationForm";
import { signIn } from "next-auth/react";



const Registration = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage('')
    setIsSuccess(false)
    //call registration api
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
      console.log(response, data)
      //success
      if (data.status === 201) { 
        setIsSuccess(true)
        //call signin api
        setTimeout(async () => {
          try {
            const res = await signIn('credentials', {
              email, password, redirect: false,
            });
  
            if (res.error) {
              setMessage('User email or password incorrect');
              return;
            }
            router.push('/timeline');
          } catch (error) {
            console.error('Login error', error);
          }
        }, 2000); 

      } else {
        //registration error
        setMessage(data.message || 'Error during registration');
      }
    } catch (error) {
      //api error
      console.error('Registration error', error);
      setMessage('Server error.');
    }
  };
  
  

  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex flex-col bumpup w-[335px]'>
      <h1 className='text-2xl text-center mt-5'>Register</h1>
        {isSuccess ? (
        <CheckMark />

      ) : (
        
        <RegistrationForm
            username={username}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            message={message}
          />
        )} 
       
      </div>
    </div>
  );
};

export default Registration;
