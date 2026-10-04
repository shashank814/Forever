import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

   const { currency, delivery_fee, getCartAmount} = useContext(ShopContext)

 return (
   <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-sm">

     <div className="mb-4 text-center sm:text-left">
       <Title text1={'CART'} text2={'TOTALS'} />
     </div>

     <div className="space-y-3 text-sm sm:text-base">

       <div className="flex justify-between items-center">
           <p className="text-gray-600">Subtotal</p>
           <p className="font-medium">{currency}{getCartAmount()}.00</p>
       </div>

       <hr />

       <div className="flex justify-between items-center">
           <p className="text-gray-600">Shipping Fee</p>
           <p className="font-medium">{currency}{delivery_fee}.00</p>
       </div>

       <hr />

       <div className="flex justify-between items-center text-base sm:text-lg">
           <b>Total</b>
           <b>
             {currency}
             {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
           </b>
       </div>

     </div>

   </div>
 )
}

export default CartTotal