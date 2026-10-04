import React, { useState } from 'react'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onsSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(backendUrl+'/api/user/admin', {email, password})
            if(res.data) {
                setToken(res.data.adminToken)
            } else {
                toast.error(res.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">

        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Admin Panel
        </h1>

        <form onSubmit={onsSubmitHandler} className="space-y-4">

          <div>
            <p className="text-sm sm:text-base mb-1">Email Address</p>
            <input 
              type="email" 
              placeholder="your@email.com" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
            />
          </div>

          <div>
            <p className="text-sm sm:text-base mb-1">Password</p>
            <input 
              type="password" 
              placeholder="Enter your password" 
               onChange={(e) => setPassword(e.target.value)}
               value={password}
              required
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
            />
          </div>

          <button 
            type='submit'
            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm sm:text-base"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login