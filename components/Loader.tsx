'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Loader = () => {
    const router = useRouter();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/transfer-bridge');
        }, 500);
        
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-between gap-[100px] w-screen bg-transparent">
            <Image src="/Component 22.svg" alt="Loading..." width={313} height={313} className='animate-spin' />
            <span className='text-center mt-10'>
            <h3>Loading...</h3>
            <h3>Please wait</h3>
            </span>
            
        </div>
    );
};

export default Loader;
