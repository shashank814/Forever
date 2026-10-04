import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if(products.length > 0) {
       const tempData = []
    for(const items in cartItems) {
      for(const item in cartItems[items]) {
        if(cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  }

  }, [cartItems, products])
  
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6">

  <div className="mb-6">
    <Title text1={'TOUR'} text2={'CART'} />
  </div>

  {/* Cart Items */}
  <div className="space-y-4">
    {
      cartData.map((item, index) => {

        const productData = products.find((product) => product._id === item._id)

        if (!productData) return null;
        return (
          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">

            {/* Left Section */}
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                <img src={productData.images[0]} alt="" className="w-full h-full object-cover rounded" />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm sm:text-base font-medium">{productData.name}</p>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <p>{currency}{productData.price}</p>
                  <p className="px-2 py-0.5 border rounded text-xs">{item.size}</p>
                </div>
              </div>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">

              <input
                onClick={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="w-16 sm:w-20 border px-2 py-1 text-sm outline-none"
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                alt=""
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
              />

            </div>

          </div>
        )
      })
    }
  </div>

  {/* Cart Total */}
  <div className="mt-10 flex justify-end">
    <div className="w-full sm:w-[400px] space-y-4">

      <CartTotal />

      <div>
        <button
          onClick={() => navigate('/place-order')}
          className="w-full bg-black text-white py-3 text-sm sm:text-base"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>

    </div>
  </div>

</div>
  )
}

export default Cart
