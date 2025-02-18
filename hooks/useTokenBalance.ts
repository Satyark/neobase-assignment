import { useAccount, useReadContract } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { erc20Abi,formatUnits } from 'viem';

type ChainName = 'polygon';
export type TokenName = 'usdc' | 'usdt';

interface ChainInfo {
  chain: any;
  usdcAddress: `0x${string}`;
  usdtAddress: `0x${string}`;
}

const chainConfig: Record<ChainName, ChainInfo> = {
  polygon: {
    chain: polygon,
    usdcAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    usdtAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
};

export function useTokenBalance(token: TokenName) {
  const { address } = useAccount();

  const chainInfo = chainConfig.polygon;
  const tokenAddress = token === 'usdc' ? chainInfo.usdcAddress : chainInfo.usdtAddress;

  const { data, isError, isLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    chainId: polygon.id,
  });

  const balance = data !== undefined ? parseFloat(formatUnits(data, 6)) : 0;
  
  return { balance, isError, isLoading };
}
