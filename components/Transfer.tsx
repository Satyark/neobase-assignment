import React from 'react'
import { BackgroundGradient } from './ui/BackGroundGradient'
import { useAccount } from 'wagmi';
import CustomConnectButton from './CustomConnectButton';
import InputField from './InputField';
import Dropdown from './Dropdown';
import { useOFT } from '@/hooks/useOFT';
import useValueStore from '@/stores/useValueStore';

const Transfer = () => {
    const {isConnected} = useAccount();
    const { transferOFT, isLoading, error, txHash } = useOFT();
    
    const {transferAmount, address} = useValueStore();
    const handleTransfer = () => {
      transferOFT(address, transferAmount);
    };

  return ( 
    <div className='shadow-2xl shadow-[#4200FF]'>
    <BackgroundGradient className="rounded-[22px] p-2 bg-black dark:bg-[#830846] w-full">
    <div className="flex justify-center items-center backdrop-blur-lg bg-gradient-to-b from-black to-bg-black/30 rounded-2xl">
      <div className="bg-black p-6 rounded-2xl shadow-lg">
        <h2 className="text-white text-[20px] font-semibold mb-4">Transfer</h2>
        <Dropdown/>

        <InputField label1="Total Amount to transfer" type="number" placeholder="0.0" inputType='amount' />
        <InputField label1="User Address" type="text" placeholder="0x0254...54780" inputType='address' />
        
        <div className='flex justify-center items-center mt-3'>
        {!isConnected && (<CustomConnectButton/>)}
        {isConnected && <button
          className="w-fit px-6 py-3 mr-4 text-white text-[14px] font-bold rounded-md bg-gradient-to-r from-[#ff00e1] via-[#8611da] to-[#4200ff] transition-opacity duration-500 opacity-100 hover:opacity-70"
          onClick={handleTransfer}
        >
          Transfer
        </button>}
        </div>
      </div>
    </div>
    </BackgroundGradient>
    </div>
  )
}

export default Transfer;