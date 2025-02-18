import useValueStore from '@/stores/useValueStore';
import React from 'react';

type InputProps = {
     label1: string; 
     label2?: string; 
     type: string; 
     placeholder: string;
     inputType: 'amount' | 'address'; 
  };
const InputField: React.FC<InputProps> = ({ label1,label2, type, placeholder, inputType }: { label1: string; label2?: string; type: string; placeholder: string; inputType: 'amount' | 'address'; }) => {
  const {address,transferAmount,setAddress, setTransferAmount} = useValueStore();
  
  return(
    <div className="max-w-md mt-2 rounded-lg p-px bg-gradient-to-r from-[#ff00e1] to-[#4200ff]">
    <div className="bg-[#171717] p-2 md:p-4  rounded-lg shadow-lg max-w-sm">
      <span className='flex justify-start items-center gap-3'>
        <label className="block text-[#374151] text-sm">{label1}</label>
        { label2 && <span className='bg-black px-3 py-1 rounded-full'>
        <label className="block text-white text-sm">{label2 ? label2 : null}</label>
        </span>}
        </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent text-gray-300 text-[24px] p-3 rounded-md border border-transparent focus:outline-none placeholder:text-[20px] md:placeholder:text-[24px]
          appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={inputType == 'address' ? address : transferAmount}
        onChange={inputType == 'address' ? (e)=>setAddress(e.target.value) : (e)=>setTransferAmount(e.target.value)}
      />
    </div>
    </div>
  )};

  export default InputField;