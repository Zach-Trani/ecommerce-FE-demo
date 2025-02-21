import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../features/products/components/HomePage";
import ProductPage from "../features/products/components/ProductPage";

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
        </Routes>
      </Router>
    </ProductContext.Provider>
  );
}

export default App;
