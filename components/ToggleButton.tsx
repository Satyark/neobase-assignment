import { cn } from '@/lib/utils';
import Image from 'next/image';

const ToggleButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
  <button
    className={cn(
      ' p-2 rounded-full flex items-center gap-1 transition-all duration-200 font-bold drop-shadow-[0_0_10px_rgb(139,92,246)] bg-gradient-to-r from-[#4200ff] via-[#8611da] to-[#ff00e1]',
      isActive ? ' text-white scale-105'
              : 'text-gray-300 bg-opacity-50'
    )}
    onClick={onClick}
  >
    {isActive && (
      <Image src="/dot.svg" alt='' width={9} height={9}/>
    )}
    {label}
  </button>
);

export default ToggleButton;