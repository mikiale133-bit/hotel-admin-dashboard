import React from 'react'
import { navitems } from '../../lib/navItems'
import { NavLink} from "react-router"
import { X } from 'lucide-react'


const Sidebar = () => { 
  return (<>
    <div className={`sidebar overflow-hidden bg-white  z-100 border-r-gray-200 border-r h-screen stick top-0 left-0 flex flex-col gap-1 p-2 pt-10 relative`}> 
      
      {navitems.map(item =>(
        <NavLink key={item.label} className='px-2 py-1.5 hover:bg-gray-200 rounded-md ' to={item.to}>{item.label}</NavLink>
      ))} 
      
    </div>
      
    </>)
}

export default Sidebar