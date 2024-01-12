import Header from '@/app/components/header';
import React from 'react';

const ContentPagesLayout = ({ children }) => {
  return (
    <div className="">
        <Header />
        {children}

    </div>
  );
};

export default ContentPagesLayout;
