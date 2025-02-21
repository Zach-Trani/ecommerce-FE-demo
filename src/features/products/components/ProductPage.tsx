import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ProductContext } from "../../../app/App";

/**
 * Page that allows a user to add a product to their cart
 *
 * @returns
 */
const ProductPage = () => {
  const { selectedProduct } = useContext(ProductContext)!;
  
  // remove when bypass of useContext is implmented
  if (!selectedProduct) {
    return <Navigate to="/" replace />;
}
  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <img
            src={selectedProduct.imgUrl}
            className="card-img-top"
            alt={selectedProduct.descriptionShort}
          />
          <div className="card-body">
            <h2 className="card-title">{selectedProduct.descriptionLong}</h2>
            <p className="card-text">Price: ${selectedProduct.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
