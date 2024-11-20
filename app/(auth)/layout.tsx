import { Logo } from '@/components/Logo';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center items-center h-screen flex-col gap-4'>
      <Logo />
      {children}
    </div>
  );
};

export default layout;
