import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartListContext, ProductContext } from "../../../app/App";
import Navbar from "../../../components/Navbar";

/**
 * Individual product page
 *
 * @returns
 */
const ProductPage = () => {
  const { id } = useParams(); // gets product id from URL
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext)!;
  const { cartList, setCartList } = useContext(CartListContext)!;
  const [selectedQuantity, setSelectedQuantity] = useState(1); 
  const navigate = useNavigate();

  // Fetch product data if needed
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
        }
      }
    };

    fetchProductDetails();
  }, [id, selectedProduct, setSelectedProduct]);

  // Fix for offcanvas scroll issue: remove Bootstrap's modal-backdrop and cleanup body classes
  useEffect(() => {
    // This runs when component mounts
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    
    // Remove any lingering backdrop elements
    const backdrop = document.querySelector('.modal-backdrop, .offcanvas-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    
    // This runs when component unmounts (when we navigate to another page) - cleanup
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      
      const backdrop = document.querySelector('.modal-backdrop, .offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    };
  }, []);

  const addToCart = () => {
    if (selectedProduct) {
      if (!selectedProduct.id) {
        console.error(`Product ${selectedProduct.descriptionShort} has no ID, cannot add to cart`);
        return;
      }
      
      const cartItem = {
        id: selectedProduct.id,
        name: selectedProduct.descriptionShort,
        amount: Math.round(selectedProduct.price * 100),
        quantity: selectedQuantity,
        imgUrl: selectedProduct.imgUrl,
      };

      console.log(`Adding to cart: ${cartItem.name} with ID: ${cartItem.id}`);

      if (!cartList) {
        setCartList([cartItem]);
      } else {
        const existingItemIndex = cartList.findIndex(
          (item) => item.id === selectedProduct.id
        );

        if (existingItemIndex >= 0) {
          const updatedCart = [...cartList];
          updatedCart[existingItemIndex].quantity += selectedQuantity;
          setCartList(updatedCart);
        } else {
          setCartList([...cartList, cartItem]);
        }
      }
    }
  };

  const handleCartDisplay = () => {
    // First clean up Bootstrap offcanvas effects
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    
    // Make sure the offcanvas is closed before navigating
    const offcanvasElement = document.getElementById('offcanvasRight');
    if (offcanvasElement) {
      const bsWindow = window as any;
      if (bsWindow.bootstrap && bsWindow.bootstrap.Offcanvas) {
        const offcanvasInstance = bsWindow.bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      }
    }
    
    navigate(`/cart`);
  }
  
  const handleCheckoutNavigate = () => {
    // First clean up Bootstrap offcanvas effects
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    
    // Make sure the offcanvas is closed before navigating
    const offcanvasElement = document.getElementById('offcanvasRight');
    if (offcanvasElement) {
      const bsWindow = window as any;
      if (bsWindow.bootstrap && bsWindow.bootstrap.Offcanvas) {
        const offcanvasInstance = bsWindow.bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      }
    }
    
    navigate('/checkout');
  }

  // Generate quantity options for dropdown (1-10)
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="container-fluid d-flex justify-content-center py-4" style={{ minHeight: "100vh" }}>
      <div className="bg-light shadow rounded" style={{ width: "75vw", padding: "40px" }}>
        <Navbar />
        
        <div className="row mt-4">
          {/* Product Image Column */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm mb-4">
              <img
                src={selectedProduct?.imgUrl}
                className="card-img-top"
                alt={selectedProduct?.descriptionShort}
                style={{ objectFit: "contain", height: "400px" }}
              />
            </div>
          </div>
          
          {/* Product Details Column */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-3">{selectedProduct?.descriptionLong}</h2>
                <h4 className="card-subtitle mb-4 text-primary fw-bold">
                  ${selectedProduct?.price}
                </h4>
                
                <p className="card-text mb-4">{selectedProduct?.descriptionLong}</p>
                
                {/* Product attributes if available */}
                {selectedProduct?.material && (
                  <p className="card-text">
                    <span className="fw-bold">Material:</span> {selectedProduct.material}
                  </p>
                )}
                
                {selectedProduct?.size && (
                  <p className="card-text">
                    <span className="fw-bold">Size:</span> {selectedProduct.size}
                  </p>
                )}
                
                {/* Quantity selector */}
                <div className="mb-4">
                  <label htmlFor="quantityDropdown" className="form-label fw-bold">Quantity:</label>
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
                
                {/* Add to cart button */}
                <button
                  className="btn btn-primary w-100 py-2"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Off canvas slider */}
        <div
          className="offcanvas offcanvas-end bg-light shadow-sm"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header border-bottom">
            <h5 id="offcanvasRightLabel" className="fw-bold">Added to Cart!</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* Product in cart */}
            {selectedProduct ? (
              <div className="card border-0 mb-4">
                <div className="row g-0">
                  <div className="col-4">
                    <img 
                      src={selectedProduct.imgUrl} 
                      className="img-fluid rounded"
                      alt={selectedProduct.descriptionShort}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title">{selectedProduct.descriptionShort}</h5>
                      <p className="card-text">${selectedProduct.price}</p>
                      <p className="card-text">Quantity: {selectedQuantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="fs-5">No product selected</p>
              </div>
            )}
            
            {/* Cart subtotal calculation */}
            <div className="card border-0 bg-light mt-4 mb-4">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items:</span>
                  <span>{cartList?.reduce((acc, item) => acc + item.quantity, 0) || 0}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                  <span>Subtotal:</span>
                  <span>${(cartList?.reduce(
                    (acc, item) => acc + (item.amount * item.quantity) / 100,
                    0
                  ) || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCartDisplay}
              >
                View Cart
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCheckoutNavigate}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
