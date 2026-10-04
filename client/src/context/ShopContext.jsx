import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = JSON.parse(localStorage.getItem("accessToken"));
    if (savedToken) {
      setToken(savedToken);
    }
  });

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // update UI instantly
    setCartItems(cartData);
    //  console.log("API HIT", itemId, size);

    if (token) {
      console.log("API HIT", itemId, size);

      try {
        const res = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Cart saved:", res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to sync cart");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      console.log("API HIT", itemId, size);

      try {
        const res = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Cart updated:", res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to update cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item]) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      setProducts(res.data.data.product);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCartItems(res.data.cartData)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]);

  useEffect(() => {
    getProductsData();
  }, []);


  const value = {
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    navigate,
    products,
    getCartCount,
    delivery_fee,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
