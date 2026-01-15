import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const Layout = () => {
  return (
    <div className='flex w-full'>
      <Sidebar/>
      <div className="flex flex-1 flex-col bg-gray-30">
        <Navbar />
        <Outlet />
      </div>
      
    </div>
  )
}

export default Layout