import { TokenName } from '@/hooks/useTokenBalance';
import { create } from 'zustand';

export interface Chain {
  name: string;
  symbol: string;
  logo: string;
  token: TokenName;
}

export const tokens: Chain[] = [
  {
      name: 'USDC',
      symbol: '/',
      logo:'/usd-coin-usdc-logo.svg',
      token: 'usdc'
  },
  {
      name: 'USDT',
      symbol: '/',
      logo:'/usdt.svg',
      token: 'usdt'
  }
]

interface ValueState {
  value: {
    name: string;
    symbol: string;
    logo: string;
    token: TokenName
  };
  setValue: (newValue: ValueState['value']) => void;
  inputValue: string;
  setInputValue: (newInputValue: ValueState['inputValue'])=> void;
  transferAmount: string;
  setTransferAmount: (newAmount: ValueState['transferAmount'])=> void;
  address: string;
  setAddress: (newAddress: ValueState['address'])=> void;
}

const useValueStore = create<ValueState>((set) => ({
  value: {
    name: tokens[0].name,
    symbol: tokens[0].symbol,
    logo: tokens[0].logo,
    token:tokens[0].token
  },
  setValue: (newValue) => set({ value: newValue }),
  inputValue: "",
  setInputValue: (newInputValue)=>set({inputValue: newInputValue}),
  transferAmount: "",
  setTransferAmount: (newTransferAmount=> set({transferAmount: newTransferAmount})),
  address: "",
  setAddress: (newAddress=> set({address: newAddress}))
}));

export default useValueStore;
