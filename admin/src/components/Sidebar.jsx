import React from 'react'
import { NavLink } from 'react-router'
import { assets } from '../assets/assets'

const Sidebar = () => {

  return (
    <div className="w-full sm:w-20 md:w-56 min-h-screen bg-white border-r">

      <div className="flex flex-col items-center sm:items-center md:items-start gap-3 sm:gap-4 p-3 sm:p-4">

        {/* Add Items */}
        <NavLink 
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-2 sm:justify-center md:justify-start p-2 rounded-md transition w-full
            ${isActive 
              ? "bg-pink-100 text-black" 
              : "hover:bg-gray-100"}`
          }
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
          <p className="text-xs sm:hidden md:block md:text-sm">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink 
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-2 sm:justify-center md:justify-start p-2 rounded-md transition w-full
            ${isActive 
              ? "bg-pink-100 text-black" 
              : "hover:bg-gray-100"}`
          }
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
          <p className="text-xs sm:hidden md:block md:text-sm">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink 
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 sm:justify-center md:justify-start p-2 rounded-md transition w-full
            ${isActive 
              ? "bg-pink-100 text-black" 
              : "hover:bg-gray-100"}`
          }
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
          <p className="text-xs sm:hidden md:block md:text-sm">Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar