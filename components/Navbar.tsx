import React from 'react';
import CustomConnectButton from './CustomConnectButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-start justify-between p-5">
        <div className="flex items-center ml-1">
        <Image src="/logo.png" alt="Neobase Logo" width={24} height={24} className='cursor-pointer' onClick={()=>router.push('/')} />
      </div>
      <div>
        <CustomConnectButton />
      </div>
    </div>
  )
}