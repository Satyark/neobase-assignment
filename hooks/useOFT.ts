import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { OFT_ABI } from '../abis/oft'; // Import the ABI for the OFT token
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
        hash: transferData, // `transferData` is the transaction hash
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
            address: getAddress(OFT_CONTRACT_ADDRESSES.arbitrum), // Ensure valid address
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
    hash: bridgeData, // `bridgeData` is the transaction hash
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
          42161, //arbitrum id
          getAddress(to),
          parseEther(amount),
          '0x0000000000000000000000000000000000000000', // zroPaymentAddress
          '0x', // AdapterParams
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

    // const transfer = useCallback(
    //     async (to: string, amount: string) => {
    //       if (!address) {
    //         toast.error('Please connect your wallet');
    //         return;
    //       }
    
    //       try {
    //         console.log("MyAdd-->", address, amount, to);
            
    //         await writeContract({
    //           address: getAddress(OFT_CONTRACT_ADDRESSES.arbitrum), // Use the Polygon contract for transfers
    //           abi: OFT_ABI, // Use the imported ABI
    //           functionName: 'transferFrom',
    //           args: [address, to, BigInt(amount)], // Convert amount to BigInt
    //         });
    //         toast.success('Transfer successful!');
    //       } catch (error) {
    //         toast.error('Transfer failed');
    //         console.error(error);
    //       }
    //     },
    //     [address, writeContract]
    //   );

    //   const bridge = useCallback(
    //     async (toChainId: number, to: string, amount: string) => {
    //       if (!address) {
    //         toast.error('Please connect your wallet');
    //         return;
    //       }
    
    //       try {
    //         await writeContract({
    //           address: getAddress(OFT_CONTRACT_ADDRESSES.polygon), // Use the source chain contract
    //           abi: OFT_ABI, // Use the imported ABI
    //           functionName: 'sendFrom',
    //           args: [
    //             address, // From address
    //             BigInt(toChainId), // Destination chain ID (LayerZero chain ID)
    //             to, // Destination address
    //             BigInt(amount), // Amount to bridge
    //             '0x0000000000000000000000000000000000000000', // zroPaymentAddress
    //             '0x', // adapterParams (empty for default)
    //           ],
    //         });
    //         toast.success('Bridging initiated!');
    //       } catch (error) {
    //         toast.error('Bridging failed');
    //         console.error(error);
    //       }
    //     },
    //     [address, writeContract]
    //   );

    //   return { transfer };

}