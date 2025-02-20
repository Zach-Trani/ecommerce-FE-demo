import axios from 'axios'
import { useState,useEffect } from 'react'

interface Product {
  id: number;
  name: string;
  dept: string;
  salary: number;
}

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Comment in front end URL for production
    // const baseurl: string = "https://zach-ecommerce-backend.azurewebsites.net/products";
    const baseurl: string = "http://localhost:9191/products";
    const url: string = `${baseurl}`;

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


  return (
    <>
      <div className="row row-cols-2 row-cols-md-3 g-4">
            {products.map((product: Product) => (
              <div className="col" key={product.id}>
                <div className="card h-100">
                  <img src={product.dept} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{product.name.toString()}</h5>
                    <p className="card-text">${product.salary}</p>
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