import React from 'react'
import { navitems } from '../../lib/navItems'
import { NavLink} from "react-router"
import { Bed, BookIcon, LayoutDashboard, Settings, User2 } from "lucide-react";


const Sidebar = () => { 
 
  return (<>
    <div className={`sidebar overflow-hidden bg-white  z-100 border-r-gray-200 border-r h-screen stick top-0 left-0 flex flex-col gap-1 p-2 pt-12 relative`}> 
      
    {navitems.map((item) => {
  const Icon = item.icon; // ✅ now legal
  return (
    <NavLink
      key={item.label}
      className="px-2 py-1.5 hover:bg-gray-200 rounded-md flex items-center gap-2"
      to={item.to}
    >
      <Icon size={18} /> {item.label}
    </NavLink>
  );
})} 
      
    </div>
      
    </>)
}

export default Sidebar