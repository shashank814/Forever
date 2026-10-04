import React from 'react'
import { assets } from "../assets/assets"

const Footer = () => {

  return (
    <div className='px-4 sm:px-8 lg:px-16 mt-16'>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm'>
        
        <div>
          <img src={assets.logo} alt="" className='mb-4 w-32' />
          <p className='text-gray-500 leading-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cum, quod consequatur incidunt fuga vitae ipsum explicabo temporibus maiores. Cumque.
          </p>
        </div>

        <div>
          <p className='text-base font-medium mb-4'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-500'>
            <li className='hover:text-black cursor-pointer'>Home</li>
            <li className='hover:text-black cursor-pointer'>About us</li>
            <li className='hover:text-black cursor-pointer'>Delivery</li>
            <li className='hover:text-black cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-base font-medium mb-4'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-500'>
            <li>+1-212-345-34</li>
            <li>contact@forever.com</li>
          </ul>
        </div>

      </div>

      <div className='mt-10'>
        <hr />
        <p className='text-center text-gray-500 text-xs sm:text-sm py-5'>
          Copyright 2024@forever.com - All Right Reserved
        </p>
      </div>

    </div>
  )
}

export default Footer