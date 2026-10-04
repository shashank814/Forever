import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {

  return (
   <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-10">

     <div className="text-2xl mb-8 text-center">
       <Title text1={'CONTACT'} text2={'US'} />
     </div>

     <div className="flex flex-col md:flex-row items-center gap-8 mb-12">

       <img
         src={assets.contact_img}
         alt=""
         className="w-full md:w-1/2 rounded-lg object-cover"
       />

       <div className="flex flex-col gap-4 text-gray-600 text-sm sm:text-base">

         <p className="text-xl font-semibold text-black">Our Store</p>

         <p>
           123 Fashion Street,  
           Kolkata, West Bengal, India - 700001
         </p>

         <p>
           +91 98765 43210 <br />
           support@forever.com
         </p>

         <p className="text-lg font-medium text-black mt-2">
           Careers at Forever
         </p>

         <p>
           Learn more about our teams and job openings. Join us to build something amazing.
         </p>

         <button className="w-fit border px-5 py-2 rounded hover:bg-black hover:text-white transition">
           Explore Jobs
         </button>

       </div>

     </div>

     <NewsLetterBox />

   </div>
  )
}

export default Contact