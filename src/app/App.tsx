import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Product, ProductContextType } from "../interfaces/productInterface";
import { CartItem, CartListContextType } from "../interfaces/cartInterface";
import HomePage from "../features/products/components/HomePage";
import ProductPage from "../features/products/components/ProductPage";
import CheckoutSuccessPage from "../features/checkout/components/CheckoutSuccessPage";
import CheckoutCancelPage from "../features/checkout/components/CheckoutCancelPage";
import CartPage from "../features/checkout/components/CartPage";
import CheckoutInformation from "../features/checkout/components/CheckoutInformation";

// put in contextproviders file 
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const CartListContext = createContext<CartListContextType | undefined>(
  undefined
);

function App() {
  // Global State - defined
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartList, setCartList] = useState<CartItem[] | null>(null);

  // Page Mount Effect - load cartList into global state from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartList');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart); // JSON.stringify: converts objs/arrs to strings for storage, JSON.parse: converts strings back to useable objs/arrs
        setCartList(parsedCart);
      } catch (error) {
        localStorage.removeItem('cartList');
      }
    }
  }, [])

  // On cartList global state change - save to local storage for offline data persisentce
  useEffect(() => {
    if (cartList && cartList.length > 0) {
      localStorage.setItem('cartList', JSON.stringify(cartList));
      console.log('local storage updated!')
    }
  }, [cartList]);

  // React router routes & context providers
  return (
      <CartListContext.Provider value={{ cartList, setCartList }}>
        <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutInformation />} />
              <Route path="/success" element={<CheckoutSuccessPage />} />
              <Route path="/cancel" element={<CheckoutCancelPage />} />
            </Routes>
          </Router>
        </ProductContext.Provider>
      </CartListContext.Provider>
  );
}
export default App;