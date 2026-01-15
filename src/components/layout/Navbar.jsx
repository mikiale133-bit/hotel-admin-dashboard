import React from 'react'
import Sidebar from './Sidebar';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <div className='bg-gray-100 w-full py-3 pl-2'>
    <div onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer  ${ isOpen ? "openSidebar" : ""}`}>
      <MenuIcon />
    </div>
      Navbar
   </div>
  )
}

export default Navbar;