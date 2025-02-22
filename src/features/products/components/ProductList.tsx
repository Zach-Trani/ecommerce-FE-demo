import axios from 'axios'
import { useState,useEffect, useContext } from 'react'
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
    // comment in front end URL for production
    const baseurl: string = "https://zach-ecommerce-backend.azurewebsites.net/products";
    // const baseurl: string = "http://localhost:9191/products";
    const url: string = `${baseurl}`;

    // main get all products request
    const getProducts = async () => {
      try {
        const response = await axios.get(url);
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
    <h1>7pm working</h1>
      <div className="row row-cols-2 row-cols-md-3 g-4">
            {products.map((product: Product) => (
              <div className="col" key={product.id} onClick={() => handleProductClick(product)}>
                <div className="card h-100">
                  <img src={product.imgUrl} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{product.descriptionShort.toString()}</h5>
                    <p className="card-text">${product.price}</p>
                    {/* <p className="card-text">{product.description}</p> */}
                    {/* <button type="button" class="btn btn-primary btn-sm" onClick={() => handleCheckout(product)}> */}
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
    </>
  )
}

export default ProductList;