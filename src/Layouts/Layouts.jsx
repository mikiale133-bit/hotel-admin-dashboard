// import React from 'react'
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Outlet } from 'react-router';

const Layouts = () => {
  return (
    <div className='flex gap-0'>
      <Sidebar />
      <div className='bg-gray-100 h-screen flex-1 pt-15'>
      <Outlet />
      </div>
    </div>
  )
}

export default Layouts