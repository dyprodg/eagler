'use client'
import { useState } from 'react';
import {useRouter} from 'next/navigation';


const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [match, setMatch] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    router.push('/set-new-password')
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const isMatch = email === confirmEmail;
    setMatch(isMatch);
    if (!isMatch) {
      setError("Emails do not match!");
      return;
    }
  
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });
      const data = await response.json();
      if (data.status < 200 || data.status > 205) {
        setError(data.body);
      } else {
        setMessage(data.body);
        setMailSent(true);
      }

    } catch (error) {
      console.error("Registration error", error);
      setError("Server error.");
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center text-center">
      <div className="flex flex-col bumpup p-10 items-center justify-center">
        <h1 className='text-3xl mb-10'>Reset Password</h1>
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <label className="flex flex-col items-start mb-4">
            Email:
            <input className="input" type="text" name="email" onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="flex flex-col items-start mb-4">
            Confirm Email:
            <input className="input" type="text" name="email" onChange={(e) => setConfirmEmail(e.target.value)} required/>
          </label>
          {error && !match && <a className='text-red-500'>{error}</a>}
          {message && <a className='text-green-500'>{message}</a>}
  
          {loading ? (
              <div>Loading...</div>
            ) : mailSent ? (
              <div className='flex flex-col'>
                <button href="/set-new-password" className="bn13 self-center mt-8" onClick={validateEmail}>
                  Set New Password
                </button>
                <button className="underline self-center mt-8" type="submit">
                  Send Email Again
                </button>
              </div>
            ) : (
              <button className="bn13 self-center mt-8" type="submit">
                Reset Password
              </button>
            )}
        </form>
      </div>
    </div>
  );
  
};  

export default ResetPassword;