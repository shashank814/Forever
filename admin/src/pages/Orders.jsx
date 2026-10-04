import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data.orders.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(backendUrl + '/api/order/status', { orderId, status:e.target.value }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      await fetchAllOrders()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">Order Page</h3>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div className="border rounded-lg p-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            
            <div key={index} className="flex gap-4 w-full lg:w-auto">
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-12 h-12 sm:w-14 sm:h-14"
              />

              <div className="text-sm sm:text-base">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity}{" "}
                        <span className="text-gray-500">
                          {item.size}
                        </span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity}{" "}
                        <span className="text-gray-500">
                          {item.size}
                        </span>,
                      </p>
                    );
                  }
                })}
              </div>
            </div>

            <div className="text-sm sm:text-base">
              <p>
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>

              <p>{order.address.phone}</p>
            </div>

            <div className="text-sm sm:text-base">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>
                Payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                Date:{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            <p className="font-semibold text-base sm:text-lg">
              {currency}
              {order.amount}
            </p>

            <select value={order.status} onChange={(e) => statusHandler(e, order._id)} className="border px-2 py-1 rounded text-sm sm:text-base w-full sm:w-auto">
              <option value="OrderPlaced">OrderPlaced</option>
              <option value="Packing">Packing</option>
              <option value="Ship">Ship</option>
              <option value="Out for delivery">
                Out for delivery
              </option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;