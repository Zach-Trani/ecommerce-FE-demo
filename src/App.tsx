import axios from 'axios'
import { useState,useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Comment in front end URL for production
    // const baseurl: string = "https://zach-ecommerce-backend.azurewebsites.net/employees";
    const baseurl: string = "http://localhost:9191/employees";
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
      <div>
        {products.map((product) => {
          return <div>{JSON.stringify(product)}</div>
        })}
        working
      </div>
    </>
  )
}

export default App
