import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../features/products/components/HomePage";
import ProductPage from "../features/products/components/ProductPage";
import CheckoutSuccessPage from "../features/products/components/CheckoutSuccessPage";
import CheckoutCancelPage from "../features/products/components/CheckoutCancelPage";

interface Product {
  id: number;
  imgUrl: string;
  descriptionShort: string;
  descriptionLong: string | null;  // Optional field
  price: number;
  material: string | null;         // Optional field
  size: string | null;            // Optional field
}

interface CartItem {
  id: number;
  name: string; // maps to product.descriptionShort
  amount: number; // price in cents
  quantity: number; // quantity in cart
  imgUrl?: string; // optional field for UI display
}

interface ProductContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

interface CartListContextType {
  cartList: CartItem[] | null;
  setCartList: (cartItems: CartItem[] | null) => void;
}
export const CartListContext = createContext<CartListContextType | undefined>(
  undefined
);

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartList, setCartList] = useState<CartItem[] | null>(null);

  return (
      <CartListContext.Provider value={{ cartList, setCartList }}>
        <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/success" element={<CheckoutSuccessPage />} />
              <Route path="/cancel" element={<CheckoutCancelPage />} />
            </Routes>
          </Router>
        </ProductContext.Provider>
      </CartListContext.Provider>
  );
}

export default App;
