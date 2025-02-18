import React, { PropsWithChildren } from 'react';
import { Navbar } from '../Navbar';
import { RetroGrid } from '../ui/retro-grid';


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-hidden bg-black bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center h-screen overflow-y-auto">
      <div className='relative z-10 w-full'>
        <div className="fixed top-0 left-0 right-0 z-10">
          <Navbar />
        </div>

        <div className="flex-grow pt-10 pb-16 flex items-center justify-center w-full mt-[100px] overflow-hidden">
          {children}
        </div>
      </div>
      {/* <RetroGrid /> */}
    </div>
  )
}

export default Layout