import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../../app/App';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  imgUrl: string;
  descriptionShort: string;
  descriptionLong: string | null;  // Optional field
  price: number;
  material: string | null;         // Optional field
  size: string | null;            // Optional field
}

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
      window.location.hostname !== 'localhost' 
        ? "https://zach-ecommerce-backend.azurewebsites.net/products" 
        : "http://localhost:9191/products";

    // main get all products request
    const getProducts = async () => {
      try {
        const response = await axios.get(baseurl);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    };
    getProducts();
    
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/products/${product.id}`)
  }

  return (
    <>
    <h1>Welcome to Zach's 3D Printed Parts Ecommerce App!</h1>
    <p>Pardon our temporary "lively-moss" url - we are in the process of purchasing a permanent domain name.</p>
      <div className="row row-cols-2 row-cols-md-3 g-4">
            {products.map((product: Product) => (
              <div className="col" key={product.id} onClick={() => handleProductClick(product)}>
                <div className="card h-100">
                  <img src={product.imgUrl} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{product.descriptionShort.toString()}</h5>
                    <p className="card-text">${product.price}</p>
                    <button type="button" className="btn btn-primary btn-sm">
                      Checkout
                    </button>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p>© 2025 | Zachary Trani</p>
    </>
  )
}

export default ProductList;