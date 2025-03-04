import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartListContext, ProductContext } from "../../../app/App";
import handleCartCheckout from "../../checkout/utils/checkoutService";
import Navbar from "../../../components/Navbar";

/**
 * Individual product page
 *
 * @returns
 */
const ProductPage = () => {
  const { id } = useParams(); // gets product id from URL
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext)!; // global state tracking currently viewed product
  const { cartList, setCartList } = useContext(CartListContext)!; // global state tracking list of products
  const [selectedQuantity, setSelectedQuantity] = useState(1); // local state tracking product qty
  const navigate = useNavigate();

  // selectedProduct global state only exists when a product is clicked from HomePage.tsx,
  // this manually updates the state if a user directly navigates to '/product/1'
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!selectedProduct && id) {
        try {
          const baseurl: string =
            window.location.hostname !== "localhost"
              ? "https://zach-ecommerce-backend.azurewebsites.net/products"
              : "http://localhost:9191/products";
          const response = await fetch(`${baseurl}/${id}`);

          if (!response.ok) {
            throw new Error(`Product with ID ${id} not found.`);
          }

          const productData = await response.json();
          setSelectedProduct(productData);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
        }
      }
    };

    fetchProductDetails();
  }, [id, selectedProduct, setSelectedProduct]);

  // Should make an interface outta this
  // pushes the selectedProduct to our global cartList state with the selected quantity
  const addToCart = () => {
    if (selectedProduct) {
      const cartItem = {
        id: selectedProduct.id,
        name: selectedProduct.descriptionShort,
        amount: Math.round(selectedProduct.price * 100), // Convert to cents
        quantity: selectedQuantity, // Use the selected quantity
        imgUrl: selectedProduct.imgUrl,
      };

      // If cart is empty, initialize it
      if (!cartList) {
        setCartList([cartItem]);
        return;
      }

      // Check if product already exists in cart
      const existingItemIndex = cartList.findIndex(
        (item) => item.id === selectedProduct.id
      );

      if (existingItemIndex >= 0) {
        // selectedProduct is already in cart, update with new quantity
        const updatedCart = [...cartList];
        updatedCart[existingItemIndex].quantity += selectedQuantity;
        setCartList(updatedCart);
      } else {
        // new product in list, add to cart
        setCartList([...cartList, cartItem]);
      }
    }
  };

  const handleCartDisplay = () => {
    navigate(`/cart`)
  }

  // Generate quantity options for dropdown (1-10)
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      
      <div
        className="container-fluid p-3 mb-2 bg-secondary text-white"
        style={{ maxWidth: "1200px" }}
      >
        <Navbar />
        <div className="row">
          <div className="col-md-8">
            <div className="container mt-4">
              <div className="card p-3 mb-2 bg-dark text-white">
                <img
                  src={selectedProduct?.imgUrl}
                  className="card-img-top"
                  alt={selectedProduct?.descriptionShort}
                />
                
              </div>
            </div>
          </div>
          {/* Offcanvas side bar to display shopping cart */}
          <div className="col-md-4 mb-2 bg-dark text-white">
            
          <div className="card-body">
                  <h2 className="card-title">
                    {selectedProduct?.descriptionLong}
                  </h2>
                  <p className="card-text">Price: ${selectedProduct?.price}</p>
                </div>

            {/* Quantity dropdown */}
            <div className="mb-3">
              <label htmlFor="quantityDropdown" className="form-label">Quantity:</label>
              <select 
                className="form-select" 
                id="quantityDropdown"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              >
                {quantityOptions.map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>

            {/* add to cart button */}
            <button
              className="btn btn-light"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              onClick={addToCart}
            >
              Add to cart
            </button>

            {/* off canvas slider */}
            <div
              className="offcanvas offcanvas-end bg-dark text-white"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Added to Cart!</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>

              {/* refactor to only show selectedProduct------ */}
              {/* bug with quantity and cart subtotal - they dont display when you back arrow from stripe page */}
              <div className="offcanvas-body">
                {/* {cartList?.map((product) => (
                  <>
                    <img src={product.imgUrl} />
                    <div>{product.name}</div>
                    <div>${product.amount / 100}</div>
                    <div>Quantity: {product.quantity}</div>
                  </>
                ))} */}
                <>
                {selectedProduct ? (
                  <>
                    <img src={selectedProduct.imgUrl} />
                    <div>{selectedProduct.descriptionShort}</div>
                    <div>${selectedProduct.price}</div>
                    <div>Quantity: {selectedQuantity}</div>
                  </>
                ) : (
                  <div>No product selected</div>
                )}
                </>
                {/* cart subtotal calculation */}
                <div>
                  Cart Subtotal (
                  {cartList?.reduce((acc, item) => acc + item.quantity, 0) || 0}{" "}
                  items): $
                  {(cartList?.reduce(
                    (acc, item) => acc + (item.amount * item.quantity) / 100,
                    0
                  ) || 0).toFixed(2)}
                </div>
                
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleCartDisplay}
                  >
                    View Cart
                  </button>
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleCartCheckout(cartList)}
                  >
                    Checkout
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
