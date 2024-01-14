'use client'
import { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { deleteAccount } from '@/app/actions';
import {useFormState} from 'react-dom'
import { signOut } from 'next-auth/react';
import CheckMark from '@/app/components/loaders/checkMark';

const DeleteAccountPage = () => {
    const { data: session, status } = useSession();
    const [emailInput, setEmailInput] = useState('');
    const initialState = {
        message: '',
      }
        
    const [state, formAction]= useFormState(deleteAccount, initialState)

    redirectNoSession(session)
    //redirect and logout after successfull user deletion
    useEffect(() => {
        let timer;
        if (state.message === 'success') {
            timer = setTimeout(async () => {
                await signOut({ redirect: false });
            }, 2000);
        }
    
        return () => clearTimeout(timer);
    }, [state.message]);
    
    if (!session) {
        return null; 
    }
    //button disabler
    const isButtonDisabled = emailInput !== session.user.email;


    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex items-center justify-center">
                {state.message === 'success' ? (
                    <CheckMark />
                ) : (
                    <form action={formAction}
                    className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h1 className="text-xl font-semibold mb-4">Delete Account</h1>
                        <p className="text-gray-600 mb-6">If you are sure that you want to delete your account please enter your Email</p>
                        <p>{session.user.email}</p>
                        <div className="mb-4">
                            <input 
                                type="email" 
                                id='email'
                                name='email'
                                placeholder="you@example.com" 
                                className="email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500" 
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                required
                            />
                        </div>
                        <button 
                            className={`w-full px-4 py-2 rounded-lg focus:outline-none ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-blue-600 text-white'}`}
                            disabled={isButtonDisabled}
                            type='submit'
                        >
                            Delete Account
                        </button>
                        {state.message ? (
                            <div >
                                {state.message}
                            </div>
                            ) : null}
                    </form>
                )}
                
                
                
            </div>
        </div>
    );
}

export default DeleteAccountPage;
