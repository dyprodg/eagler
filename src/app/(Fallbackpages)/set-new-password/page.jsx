'use client'
import { useState } from 'react';
import {useRouter} from 'next/navigation';


const SetNewPassword = () => {
  const [email, setEmail] = useState('');
  const [VerifyCode, setVerifyCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [match, setMatch] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); 
    const isMatch = newPassword === confirmPassword;
    setMatch(isMatch);
    if (!match) {
      setError("Emails do not match!");
      return;
    }
  
    try {
      const response = await fetch("/api/auth/set-new-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, VerifyCode, newPassword}),
      });
      const data = await response.json();
      if (data.status < 200 || data.status > 205) {
        setError(data.body);
      } else {
        setMessage(data.body);
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
            <input className="input" type="email" name="email" onChange={(e) => setEmail(e.target.value)} autocomplete="off" required />
          </label>
          <label className="flex flex-col items-start mb-4">
            Verify Code:
            <input className="input" type="text" name="verify-code" onChange={(e) => setVerifyCode(e.target.value)} autocomplete="off" required />
          </label>
          <label className="flex flex-col items-start mb-4">
            New Password:
            <input className="input" type="password" name="new-password" onChange={(e) => setNewPassword(e.target.value)} autocomplete="off" required />
          </label>
          <label className="flex flex-col items-start mb-4">
            Confirm Password:
            <input className="input" type="password" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} autocomplete="off" required />
          </label>
          {error && <a className='text-red-500'>{error}</a>}
          {message && <a className='text-green-500'>{message}</a>}
  
          {loading ? (
              <div>Loading...</div>
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

export default SetNewPassword;