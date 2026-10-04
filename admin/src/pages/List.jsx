import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/list')
      setList(res.data.data.product)
    } catch (error) {
      console.log(error.message);
    }
  }

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(backendUrl + `/api/product/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("product removed successfully")
     await fetchList()
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="text-lg font-semibold mb-4">All Products List</p>

      <div className="w-full overflow-x-auto">

        {/* List Table Title */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 bg-gray-100 p-2 sm:p-3 text-xs sm:text-sm font-semibold border rounded-md min-w-[500px]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 sm:gap-4 items-center border-b p-2 sm:p-3 text-xs sm:text-sm min-w-[500px]"
            >
              <img
                src={item.images[0]}
                alt=""
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
              />

              <p className="truncate">{item.name}</p>

              <p>{item.category}</p>

              <p>{currency}{item.price}</p>

              <p onClick={() => removeProduct(item._id)} className="text-center text-red-500 cursor-pointer hover:scale-110 transition">
                X
              </p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List