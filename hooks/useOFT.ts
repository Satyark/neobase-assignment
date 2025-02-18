import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { OFT_ABI } from '../abis/oft';
import { useEffect, useState } from 'react';
import { getAddress, parseEther } from 'viem';

const OFT_CONTRACT_ADDRESSES = {
    polygon: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
    arbitrum: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
  };


export const useOFT = ()=>{
    const { address } = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { data: transferData, writeContract: transfer } = useWriteContract();
    const {
        isLoading: isTransferPending,
        isSuccess: isTransferSuccess,
        isError: isTransferError,
      } = useWaitForTransactionReceipt({
        hash: transferData,
      });

      useEffect(() => {
        if (isTransferSuccess) {
          setIsLoading(false);
          console.log('Transfer successful!');
        }
        if (isTransferError) {
          setIsLoading(false);
          setError('Transfer failed');
        }
      }, [isTransferSuccess, isTransferError]);

      const transferOFT = async (to: string, amount: string) => {
        if (!address) return;
        try {
          setIsLoading(true);
          await transfer({
            address: getAddress(OFT_CONTRACT_ADDRESSES.arbitrum),
            abi: OFT_ABI,
            functionName: 'transferFrom',
            args: [getAddress(address), getAddress(to), parseEther(amount)],
          });
        } catch (err: any) {
          setError(err.message);
          setIsLoading(false);
        }
      };


        // ** Bridge OFT tokens **
  const { data: bridgeData, writeContract: bridge } = useWriteContract();
  const {
    isLoading: isBridgePending,
    isSuccess: isBridgeSuccess,
    isError: isBridgeError,
  } = useWaitForTransactionReceipt({
    hash: bridgeData,
  });
  useEffect(() => {
    if (isBridgeSuccess) {
      setIsLoading(false);
      console.log('Bridge successful!');
    }
    if (isBridgeError) {
      setIsLoading(false);
      setError('Bridge failed');
    }
  }, [isBridgeSuccess, isBridgeError]);

  const bridgeOFT = async (to: string, amount: string) => {
    if (!address) {
      setError('Please connect your wallet');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      await bridge({
        address: getAddress(OFT_CONTRACT_ADDRESSES.polygon),
        abi: OFT_ABI,
        functionName: 'sendFrom',
        args: [
          getAddress(address),
          42161,
          getAddress(to),
          parseEther(amount),
          '0x0000000000000000000000000000000000000000',
          '0x',
        ],
      });
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

      return {transferOFT,
        bridgeOFT,
        isLoading: isLoading || isTransferPending || isBridgePending,
        error,
        txHash: transferData || bridgeData }

};