import React from 'react'
import { BackgroundGradient } from './ui/BackGroundGradient'
import { useAccount } from 'wagmi';
import CustomConnectButton from './CustomConnectButton';
import Dropdown from './Dropdown';
import InputField from './InputField';
import InputFieldBridge from './InputFieldBridge';
import useValueStore from '@/stores/useValueStore';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { cn } from '@/lib/utils';
import { useOFT } from '@/hooks/useOFT';
import Image from 'next/image';

const Bridge = () => {
    const {isConnected} = useAccount();
    const {value, inputValue, address} = useValueStore();
    const { bridgeOFT, isLoading, error, txHash } = useOFT();
    const {balance} = useTokenBalance(value.token);
    
    const handleBridge = ()=>{
        bridgeOFT(address, inputValue);
    };

  return ( 
    <div className='shadow-2xl shadow-[#4200FF]'>
    <BackgroundGradient className="rounded-[22px] p-2 bg-black dark:bg-[#830846] w-full">
    <div className="flex justify-center items-center backdrop-blur-lg bg-gradient-to-b from-black to-bg-black/30 rounded-2xl space-y-4">
      <div className="bg-black p-6 rounded-2xl shadow-lg">
        <h2 className="text-white text-[20px] font-semibold mb-4">Bridge</h2>
        <Dropdown/>
        
        <InputFieldBridge label1="From" label2='Polygon' type="number" placeholder="0.0" balance={balance}/>
        <span className='flex items-center justify-center m-2'>
        <Image src='/arrow_circle_down.svg' alt='' width={20} height={20} /> 
        </span>
        <InputField label1="To" label2='Arbitrum' type="text" placeholder="0x0254...54780" inputType='address' />

        <div className='flex justify-center items-center mt-3'>
        {!isConnected && (<CustomConnectButton/>)}
        {isConnected && <button
          className={cn('w-fit px-6 py-3 mr-4 text-white text-[14px] font-bold rounded-md bg-gradient-to-r from-[#ff00e1] via-[#8611da] to-[#4200ff] transition-opacity duration-500 opacity-100 hover:opacity-70', balance >0 ? '' :'cursor-not-allowed' )}
          onClick={handleBridge}
        >
          {balance > 0 ? 'Bridge Tokens': 'Insufficient Balance'}
        </button>}
        </div>
      </div>
    </div>
    </BackgroundGradient>
    </div>
  )
}

export default Bridge;