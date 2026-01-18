import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Menu, MenuIcon, X } from 'lucide-react'
import { useState } from 'react'
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex w-full'>
      <h2 onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "ml-40  right-0" : "text-red-500"} fixed mt-3  z-1000 left-1`}>  
        {isOpen ? <X size={25} /> : <MenuIcon />}
      </h2>
      <div className={`${isOpen ? "w-50 transition" : "w-0 -translate-x-100 transition"} transition max-sm:fixed z-100 sticky top-0 left-0`}>
        <Sidebar/>
      </div>
      
      <div className="flex flex-1 flex-col bg-gray-30">
        <div className=''>
          <Navbar />
        </div>
        <div className='pt-9'>
        <Outlet />
        </div>
      </div>
      
    </div>
  )
}

export default Layout