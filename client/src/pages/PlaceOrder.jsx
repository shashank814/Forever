import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    products,
    getCartCount,
    delivery_fee,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    setCartItems,
    cartItems
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        console.log(res);
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', res, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if(data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      let orderItems = []

      for(const items in cartItems) {
        for(const item in cartItems[items]) {
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items)) 
            if(itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          } 
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method) {

        // API calls for COD
        case 'cod':
          const res = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setCartItems({})
          toast.success("Order Placed")
          navigate('/orders')
          break;

          case 'stripe': 
          const resStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if(resStripe.data.success) {
            const { session_url } = resStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(resStripe.data.message)
          }
          break;

          case 'razorpay':
            const resRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            if(resRazorpay.data.success) {
              initPay(resRazorpay.data.order);
            }
          break;

          default:
            break;
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-12 py-6"
    >
      {/* Left Side */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="mb-4">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="w-full border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="w-full border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="w-full border px-3 py-2 text-sm outline-none"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="w-full border px-3 py-2 text-sm outline-none"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="w-full border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="w-full border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="w-full border px-3 py-2 text-sm outline-none"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="w-full border px-3 py-2 text-sm outline-none"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="w-full border px-3 py-2 text-sm outline-none"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <CartTotal />
        </div>

        <div>
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment Methods */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-sm sm:text-base">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-sm sm:text-base"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
