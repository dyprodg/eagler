import CheckMark from '@/app/components/loaders/checkMark';
import React from 'react';

const EmailVerifiedPage = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <h1 className='text-3xl text-shadow'>Email Verified</h1>
            <CheckMark />
            <p>Your email has been successfully verified.</p>
        </div>
    );
};

export default EmailVerifiedPage;