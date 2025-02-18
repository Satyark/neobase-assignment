import useValueStore from '@/stores/useValueStore';
import React from 'react';
import { useAccount } from 'wagmi';

type InputProps = {
     label1: string; 
     label2?: string; 
     type: string; 
     placeholder: string,
     balance: number,
  };
const InputFieldBridge: React.FC<InputProps> = ({ label1,label2, type, placeholder, balance }) => {
    const {value, inputValue,setInputValue} = useValueStore();
    
    return (
    <div className="max-w-md mt-2 rounded-lg p-px bg-gradient-to-r from-[#ff00e1] to-[#4200ff]">
    <div className="bg-[#171717] p-5 rounded-lg shadow-lg max-w-sm">
      <span className='flex justify-start items-center gap-3'>
        <label className="block text-[#374151] text-sm">{label1}</label>
        { label2 && <span className='bg-black px-3 py-1 rounded-full'>
        <label className="block text-white text-sm">{label2 ? label2 : null}</label>
        </span>}
        </span>
    <span className='flex justify-between items-center'>
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        className="w-full bg-transparent text-gray-300 text-[20px] md:text-[24px] p-3 rounded-md border border-transparent focus:outline-none placeholder:text-[20px] md:placeholder:text-[24px]
          appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
          className="w-fit px-3 py-2 text-white text-[14px] font-medium rounded-md bg-gradient-to-r from-[#ff00e1] via-[#8611da] to-[#4200ff]
            transition-opacity duration-500 opacity-100 hover:opacity-70"
            onClick={()=>setInputValue(balance.toString())}
        >
          Max
        </button>
    </span>
    <label className="block text-[#374151] text-sm">Balance: {balance} {value.token == 'usdc' ? 'USDC' : 'USDT'}</label>
    </div>
    </div>
  )};

  export default InputFieldBridge;