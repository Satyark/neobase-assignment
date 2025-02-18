'use client'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

const Hero = () => {
    const router = useRouter();
    
  return (
    <div className="relative flex flex-col items-start space-y-4 px-4 text-left mt-[50px] -mr-10 pt-10">
      <h1 className='text-4xl sm:text-6xl md:text-8xl text-white font-normal text-left'>
        Welcome to
      </h1>
      <h1 className='text-4xl sm:text-6xl md:text-8xl text-white font-bold capitalize'>
        NeoBase Coding
      </h1>
      <div className="flex md:flex-row items-center gap-4 md:gap-28">
      <h1 className='text-4xl sm:text-6xl md:text-8xl text-white font-bold capitalize'>
       Round
      </h1>
      <span className="flex flex-col md:flex-row items-center gap-6 text-[14px]  md:text-[18px] font-semibold">
      <button className="py-2 px-4 md:px-8 bg-gradient-to-r from-[#0029FF] to-[#0000008e] rounded-full hover:opacity-70 transition-opacity duration-500 flex items-center gap-3" onClick={()=>router.push('/loader')}><Image src='/arrow.svg' alt='' width={16} height={16}/> Get Started</button>  
      </span>  
      </div>
      <div className='absolute top-2 md:top-[3%] right-[10%] md:right-[20%] w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28'>
        <Image src='/3dicons.svg' alt='' width={176} height={176}/>
      </div>
      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-[50px] sm:top-16 md:top-[30%] left-1/2">
      <Image src='/3dicons (1).svg' alt='' width={176} height={176}/>
      </div>

      <div className='w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 absolute -bottom-[30%] md:-bottom-[15%] left-[5%] sm:left-[10%]'>
      <Image src='/3dicons (2).svg' alt='' width={176} height={176}/>
      </div>
    </div>
  )
}

export default Hero;
