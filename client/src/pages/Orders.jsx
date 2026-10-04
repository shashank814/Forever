import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

   const { backendUrl, token, currency } = useContext(ShopContext)

   const [orderData, setorderData] = useState([])

   const loadOrderData = async () => {
    try {

      if(!token) {
        return null
      }

      const res = await axios.post(backendUrl + '/api/order/userorders', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      let allOrderItems = []
      res.data.orders.map((order) => {
        order.items.map((item) => {
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          item['date'] = order.date
          allOrderItems.push(item)
        })
      })
      setorderData(allOrderItems.reverse());
      
      
    } catch (error) {
      
    }
   }

   useEffect(() => {
     loadOrderData()
   }, [token])

 return (
   <div className="border-t pt-10 px-4 sm:px-8 md:px-16 lg:px-24">

     <div className="text-2xl mb-8">
       <Title text1={'MY'} text2={'ORDERS'} />
     </div>

     <div className="flex flex-col gap-6">
       {
         orderData.map((item, index) => (
           <div key={index} className="border rounded-lg p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

             <div className="flex flex-col sm:flex-row gap-4">
               <img
                 src={item.images[0]}
                 alt=""
                 className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded"
               />

               <div className="flex flex-col gap-2 text-sm sm:text-base">
                 <p className="font-semibold">{item.name}</p>

                 <div className="flex flex-wrap gap-4 text-gray-600">
                   <p>{currency}{item.price}</p>
                   <p>Quantity: {item.quantity}</p>
                   <p>Size: {item.size}</p>
                 </div>

                 <p className="text-gray-500 text-sm">
                   Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                 </p>
                 <p className="text-gray-500 text-sm">
                   Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                 </p>
               </div>
             </div>

             <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-4">

               <div className="flex items-center gap-2 text-sm">
                 <p className="w-2 h-2 rounded-full bg-green-500"></p>
                 <p className="text-gray-600">{item.status}</p>
               </div>

               <button onClick={loadOrderData} className="border px-4 py-2 text-sm rounded hover:bg-black hover:text-white transition">
                 Track Order
               </button>

             </div>

           </div>
         ))
       }
     </div>

   </div>
 )
}

export default Orders