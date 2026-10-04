import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify"

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || "");

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token))
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
