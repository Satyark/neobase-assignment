import React, { useState } from 'react';
import Transfer from './Transfer';
import Bridge from './Bridge';
import ToggleButton from './ToggleButton';
import Table from './table/Table';
import { useSwitchChain } from 'wagmi';

const TransferBridge = () => {
  const [operation, setOperation] = useState<'transfer' | 'bridge'>('transfer');
  const { switchChain } = useSwitchChain();

  
  const handleSwitchNetwork = (networkId: number) => {
    switchChain({ chainId: networkId })
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-5 gap-2">
        <ToggleButton label="Transfer" isActive={operation === 'transfer'}
        onClick={() => {
          setOperation('transfer');
          handleSwitchNetwork(42161);
        }} />
        <div className="text-white tracking-widest font-bold">--------------</div>
        <ToggleButton label="Bridge" isActive={operation === 'bridge'} 
        onClick={() => {
            setOperation('bridge');
            handleSwitchNetwork(137);
          }} />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
      <div className="w-[350px] md:w-[450px]">
      {operation === 'transfer' ? <Transfer /> : <Bridge />}
      </div>
      <div className='w-[350px] md:w-[900px] mt-3'>
        <h3 className='font-bold'>Transactions</h3>
      <Table/>
      </div>
    </div>
    </div>
  );
};

export default TransferBridge;
