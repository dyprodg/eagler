'use client'
import { useState } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
  };
  const handleDecline = () => {
    window.location.replace('about:blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 flex justify-between items-center">
      <p>This website uses only cookies that are technically needed for the website to work.</p>
      <div className='space-x-4'>
        <button className='border border-gray-500 rounded-xl p-2 hover:border-black' onClick={handleAccept}>Accept</button>
        <button className='border border-gray-500 rounded-xl p-2 hover:border-black' onClick={handleDecline}>Decline</button>
      </div>
      
    </div>
  );
};

export default CookieBanner;