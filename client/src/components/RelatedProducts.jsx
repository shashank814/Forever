import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {

   const { products, currency } = useContext(ShopContext)
   const [related, setRelated] = useState([])

   useEffect(() => {
       if(products.length > 0) {
           let productsCopy = products.slice()
           productsCopy = productsCopy.filter((item) => category === item.category)
           productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
           setRelated(productsCopy.slice(0, 5))
       }
   }, [products])

 return (
   <div className="mt-12 px-4 sm:px-6 lg:px-12">

     <div className="text-center mb-6">
       <Title text1={'RELATED'} text2={'PRODUCT'} />
     </div>

     <div className="
       grid 
       grid-cols-2 
       sm:grid-cols-3 
       md:grid-cols-4 
       lg:grid-cols-5 
       gap-4 sm:gap-5 md:gap-6
     ">
       {related.map((item, index) => {
           return (
             <div className="hover:scale-105 transition duration-200" key={index}>
               <ProductItem 
                 id={item._id} 
                 name={item.name} 
                 price={item.price} 
                 images={item.images} 
               />
             </div>
           )
       })}
     </div>

   </div>
 )
}

export default RelatedProducts