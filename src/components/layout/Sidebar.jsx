import React from 'react'
import { useState } from 'react'
import { navitems } from '../../lib/navItems'
import { NavLink} from "react-router"
import { X } from 'lucide-react'


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (<>

    <div className={`sidebar ${isOpen ? "hidden" : ""} bg-white w-50 max-sm:fixed z-100 border-r-gray-200 border-r h-screen stick top-0 left-0 flex flex-col gap-1 p-2 pt-10`}> 
      <div className="cursor-pointer absolute right-1 top-1" onClick={() => setIsOpen(!isOpen)}>
        <X size={25} />
      </div> 
      
      {navitems.map(item =>(
        <NavLink key={item.label} className='px-2 py-1.5 hover:bg-gray-200 rounded-md' to={item.to}>{item.label}</NavLink>
      ))} 
      
    </div>
      
    </>)
}

export default Sidebar