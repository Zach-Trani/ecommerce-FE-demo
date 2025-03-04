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
    <div style={{ width: "75vw", padding: "40px" }}>
      <h1>Lively Moss is a ecommerce stop for all things 3D printed!</h1>
      <div className="bg-light shadow rounded row row-cols-2 row-cols-md-3 g-4">
        {products.map((product: Product) => (
          <div
            className="col"
            key={product.id}
            onClick={() => handleProductClick(product)}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100">
              <img src={product.imgUrl} className="card-img-top" alt="..." />
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
      <p>© 2025 | Zachary Trani</p>
    </div>
  );
};

export default ProductList;
