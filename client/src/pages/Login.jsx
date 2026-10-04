import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { navigate, backendUrl, token, setToken } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHnadler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        setToken(res.data.accessToken);
        console.log(res.data.accessToken);
        
  
        localStorage.setItem(
          "accessToken", JSON.stringify(res.data.accessToken),
        );
        toast.success("User Register Successfully");
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        setToken(res.data.data.accessToken);

        localStorage.setItem(
          "accessToken", JSON.stringify(res.data.data.accessToken),
        );
        toast.success("User LoggedIn Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

  // useEffect(() => {
  //   const savedToken = JSON.parse(localStorage.getItem("accessToken"));
  //   if (savedToken) {
  //     setToken(savedToken);
  //   }
  // });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHnadler}
      className="flex items-center justify-center min-h-screen bg-gray-50 px-4"
    >
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-semibold">{currentState}</p>
          <hr className="w-16 border-gray-300" />
        </div>

        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
          />
        )}

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
        />

        <div className="flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:underline">Forgot yout password</p>

          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer text-black font-medium hover:underline"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer text-black font-medium hover:underline"
            >
              Login here
            </p>
          )}
        </div>

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default Login;
