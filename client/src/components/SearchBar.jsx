import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from "react-router"

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if(location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])
  
  return showSearch && visible ? (
    <div className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3">
      
      <div className="flex items-center w-full max-w-xl border border-gray-300 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 bg-white">
        <input 
          className="flex-1 outline-none text-xs sm:text-sm md:text-base bg-transparent"
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          type="text" 
          placeholder='Search' 
        />
        <img 
        onClick={() => setShowSearch(true)}
          className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" 
          src={assets.search_icon} 
          alt="" 
        />
      </div>

      <img 
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer"
        onClick={() => setShowSearch(false)} 
        src={assets.cross_icon} 
        alt="" 
      />

    </div>
  ) : null
}

export default SearchBar