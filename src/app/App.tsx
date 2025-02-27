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

interface ProductContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
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
  );
}

export default App;
