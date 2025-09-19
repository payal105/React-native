// AppContextProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { dummyProducts } from "../assets/assets";

axios.defaults.withCredentials = true;


axios.defaults.baseURL = "https://greencart-backend-rosy-phi.vercel.app"; // Replace with your backend URL

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const currency = "₹";

  const showToast = (msg) => Alert.alert("Info", msg);

  // Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // Fetch user
const fetchUser = async () => {
  try {
    const { data } = await axios.get("/api/user/is-auth", { withCredentials: true });
    if (data.success) {
      setUser(data.user); // store user object { email, name }
      setCartItems(data.user.cartItems || {});
    } else {
      setUser(null);
    }
  } catch {
    setUser(null);
  }
};


  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts(dummyProducts); // fallback
      }
    } catch (error) {
      showToast(error.message);
      setProducts(dummyProducts); // fallback
    }
  };

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    showToast("Added to cart");
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  // Get total cart count
  const getCartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

  useEffect(() => {
    fetchSeller();
    fetchUser();
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isSeller,
        setIsSeller,
        products,
        currency,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        searchQuery,
        setSearchQuery,
        getCartCount,
        fetchProducts,
        fetchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
