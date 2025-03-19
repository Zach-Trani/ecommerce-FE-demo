import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../app/App";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../interfaces/productInterface";

/**
 * Component renders all products
 * @returns Product card
 */
const ProductList = () => {
  // user selected product global state
  const { setSelectedProduct } = useContext(ProductContext)!;
  const navigate = useNavigate();

  // all products request state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use a ternary operator to set the base URL
    const baseurl: string =
      window.location.hostname !== "localhost"
        ? "https://zach-ecommerce-backend.azurewebsites.net/products"
        : "http://localhost:9191/products";

    // main get all products request
    const getProducts = async () => {
      try {
        const response = await axios.get(baseurl);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/products/${product.id}`);
  };

  return (
    <>
    <div className="container bg-light shadow rounded" style={{ padding: "40px" }}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
        {products.map((product: Product) => (
          <div
            className="col mb-4 d-flex justify-content-center"
            key={product.id}
            onClick={() => handleProductClick(product)}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100" style={{ width: "100%", maxWidth: "465px" }}>
              <img 
                src={product.imgUrl} 
                className="card-img-top" 
                alt={product.descriptionShort}
                style={{ objectFit: "contain", height: "620px" }} 
              />
              <div className="card-body">
                <h5 className="card-title">
                  {product.descriptionShort.toString()}
                </h5>
                <p className="card-text">${product.price}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Added x weeks ago</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    <p className="py-3 mt-4 text-center">© 2025 | Zachary Trani</p>
    </>
  );
};

export default ProductList;
