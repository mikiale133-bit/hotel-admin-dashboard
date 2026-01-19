import React from 'react'
import Sidebar from './Sidebar';
import { MenuIcon } from 'lucide-react';
const Navbar = () => {
  return (
   <div className='bg-blue-500 w-full fixed py-3 flex gap-2 items-center z-10'>
      <span className='ml-auto w-9 h-9 rounded-full bg-white border-10 border-white mr-3'></span>
   </div>
  )
}

export default Navbar;