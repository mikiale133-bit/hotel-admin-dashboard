import React from 'react'
import Sidebar from './Sidebar';
import { MenuIcon } from 'lucide-react';
const Navbar = () => {
  return (
   <div className='bg-gray-100 w-full fixed py-2 flex gap-2 items-center z-10'>
      <span className='ml-auto w-9 h-9 rounded-full bg-green-500 border-10 border-green-200 mr-3'></span>
   </div>
  )
}

export default Navbar;