import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {

  return (
   <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-10">

     <div className="text-2xl mb-8 text-center">
       <Title text1={'ABOUT'} text2={'US'} />
     </div>

     <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
       <img
         src={assets.about_img}
         alt=""
         className="w-full md:w-1/2 rounded-lg object-cover"
       />

       <div className="flex flex-col gap-4 text-gray-600 text-sm sm:text-base">
         <p>
           We are a modern e-commerce platform focused on delivering high-quality
           fashion and lifestyle products at affordable prices. Our goal is to
           make online shopping simple, reliable, and enjoyable for everyone.
         </p>

         <p>
           From carefully curated collections to seamless user experience, we
           ensure that every step — from browsing to checkout — is smooth and
           efficient.
         </p>

         <b className="text-black text-lg">Our Mission</b>

         <p>
           Our mission is to provide customers with the best products while
           maintaining transparency, trust, and fast delivery. We aim to build a
           platform where quality meets convenience.
         </p>
       </div>
     </div>

     <div className="text-2xl mb-6 text-center">
       <Title text1={'WHY'} text2={'CHOOSE US'} />
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">

       <div className="border p-6 rounded-lg hover:shadow-md transition">
         <b className="text-lg">Quality Assurance</b>
         <p className="text-gray-600 text-sm mt-2">
           Every product goes through strict quality checks to ensure durability,
           comfort, and value for money.
         </p>
       </div>

       <div className="border p-6 rounded-lg hover:shadow-md transition">
         <b className="text-lg">Convenience</b>
         <p className="text-gray-600 text-sm mt-2">
           Easy navigation, secure checkout, and fast delivery make your shopping
           experience hassle-free.
         </p>
       </div>

       <div className="border p-6 rounded-lg hover:shadow-md transition">
         <b className="text-lg">Exceptional Customer Service</b>
         <p className="text-gray-600 text-sm mt-2">
           Our support team is always ready to help you with queries, returns, or
           any assistance you need.
         </p>
       </div>

     </div>

     <NewsLetterBox />

   </div>
  )
}

export default About