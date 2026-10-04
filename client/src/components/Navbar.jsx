import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-4 px-4 md:px-8 lg:px-16 relative">

      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-28 sm:w-32 md:w-36" alt="" />
      </Link>

      {/* Nav Links */}
      <ul className="hidden sm:flex gap-6 text-gray-600">
        <NavLink to="/" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`}>
          <p>Home</p>
        </NavLink>

        <NavLink to="/collection" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`}>
          <p>Collection</p>
        </NavLink>

        <NavLink to="/about" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`}>
          <p>About</p>
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${isActive ? "text-black" : ""}`}>
          <p>Contact</p>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        {/* Profile */}
        <div className="relative group">
          {
            token ? (
              <>
                {/* Logged In */}
                <img
                  src={assets.profile_icon}
                  className="w-5 cursor-pointer"
                  alt=""
                  tabIndex={0}
                />

                <div className="absolute right-0 pt-4 
                  opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible
                  group-focus-within:opacity-100 group-focus-within:visible
                  transition-all duration-200 z-50">

                  <div className="flex flex-col gap-2 w-36 py-3 px-4 bg-white text-gray-500 rounded shadow-md">
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                    <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                    <p onClick={logout} className="cursor-pointer hover:text-black">
                      Logout
                    </p>
                  </div>

                </div>
              </>
            ) : (
              /* Logged Out */
              <Link to="/login">
                <img
                  src={assets.profile_icon}
                  className="w-5 cursor-pointer"
                  alt=""
                />
              </Link>
            )
          }
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50 ${visible ? "w-full sm:w-80" : "w-0"}`}>
        <div className="flex flex-col text-gray-600 h-full">

          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} to="/" className={({ isActive }) =>
            `py-4 pl-6 border-b ${isActive ? "bg-gray-100 text-black" : ""}`}>
            Home
          </NavLink>

          <NavLink onClick={() => setVisible(false)} to="/collection" className={({ isActive }) =>
            `py-4 pl-6 border-b ${isActive ? "bg-gray-100 text-black" : ""}`}>
            Collection
          </NavLink>

          <NavLink onClick={() => setVisible(false)} to="/about" className={({ isActive }) =>
            `py-4 pl-6 border-b ${isActive ? "bg-gray-100 text-black" : ""}`}>
            About
          </NavLink>

          <NavLink onClick={() => setVisible(false)} to="/contact" className={({ isActive }) =>
            `py-4 pl-6 border-b ${isActive ? "bg-gray-100 text-black" : ""}`}>
            Contact
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default Navbar;