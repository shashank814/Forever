import React from 'react'
import { assets } from "../assets/assets"

const Navbar = ({ setToken }) => {

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 bg-white shadow-sm">

      <img 
        src={assets.logo} 
        alt="" 
        className="w-24 sm:w-28 md:w-32 lg:w-36 object-contain"
      />

      <button onClick={()=>setToken('')} className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
        Logout
      </button>

    </div>
  )
}

export default Navbar