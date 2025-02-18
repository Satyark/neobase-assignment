"use client";

import useValueStore, { tokens } from '@/stores/useValueStore';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';


const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>(null); 
  const { value, setValue } = useValueStore();



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  
  const handleClick=(name: string)=>{
    for(let i=0; i<tokens.length;i++){
        tokens[i].name === name ? setValue(tokens[i]) : null 
    }
    setIsOpen(false);
  }
  

  const displayName = value? value.name: tokens[0].name;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative text-start mt-2" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div className='w-fit mt-2 rounded-md p-px bg-gradient-to-r from-[#ff00e1] to-[#4200ff]'>
      <button
        type="button"
        className="flex justify-between w-fit px-4 py-2 bg-black rounded-md text-[14px] font-manrope text-white focus:outline-none"
        id="options-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <span className='flex justify-center items-center gap-2 text-[12px]'>
          {value? (
            <Image src={value.logo} alt='/' width={20} height={20} className=''/>
          ): <Image src={tokens[0].logo} alt='/' width={20} height={20} className=''/>}
        {displayName}
        </span>
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='origin-top-left absolute left-0 w-fit mt-2 rounded-md p-px bg-gradient-to-r from-[#ff00e1] to-[#4200ff]'>
        <div
          className=" w-fit shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-10 rounded-md p-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
          {tokens?.map((chain) => (
              <button
                key={chain.name}
                className="flex justify-between items-center gap-2 w-full px-4 py-2 text-[12px] text-white hover:bg-gray-700"
                role="menuitem"
                onClick={() => handleClick(chain.name)}
              >
                <span className='flex gap-2'>
                <Image src={chain.logo} alt={chain.name} width={20} height={20} />
                {chain.name}
                </span>
                {chain.name == displayName ? (
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=''
                  width="24"
                  height="24"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.285 5.707a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9.5 14.086l9.293-9.293a1 1 0 0 1 1.492 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                ) : null}
                
              </button>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;