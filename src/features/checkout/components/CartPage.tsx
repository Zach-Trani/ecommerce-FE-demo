import { useContext } from "react";
import { CartListContext } from "../../../app/App";
import Navbar from "../../../components/Navbar";
import handleCartCheckout from "../utils/checkoutService";

const CartPage = () => {
  const { cartList, setCartList } = useContext(CartListContext)!;
  
  // Generate quantity options (1-10)
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  
  // Handle quantity change by directly updating the global cartList
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (cartList) {
      const updatedCart = cartList.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartList(updatedCart);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center py-4" style={{ minHeight: "100vh" }}>
      
      {/* Main container - explicitly 75% of viewport width */}
      <div className="bg-light shadow rounded" style={{ width: "75vw", padding: "40px" }}>
      <Navbar />
        <h2 className="mb-4">Your Cart</h2>
        
        {/* cart items header row */}
        <div className="row mb-3 fw-bold border-bottom pb-3">
          <div className="col-md-3">Category</div>
          <div className="col-md-3">Product</div>
          <div className="col-md-3">Quantity</div>
          <div className="col-md-3">Price</div>
        </div>
        
        {/* cart list display */}
        {cartList?.map((product) => (
          <div className="row py-4 border-bottom align-items-center" key={product.id}>
            <div className="col-md-3 text-muted">
              Category
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <img 
                src={product.imgUrl} 
                alt={product.name} 
                style={{ width: "70px", height: "70px", objectFit: "contain", marginRight: "20px" }} 
                className="img-thumbnail"
              />
              <span className="fs-5">{product.name}</span>
            </div>

            {/* Quantity dropdown menu */}
            <div className="col-md-3">
              <div className="d-flex align-items-center">
                <span className="me-2 fs-5">Quantity:</span>
                <select 
                  className="form-select" 
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                  style={{ width: "80px" }}
                >
                  {quantityOptions.map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="col-md-3">
              <span className="fw-bold fs-4">${(product.amount / 100).toFixed(2)}</span>
            </div>
          </div>
        ))}
        
        {/* Empty cart message */}
        {(!cartList || cartList.length === 0) && (
          <div className="text-center py-5">
            <p className="fs-5">Your cart is empty</p>
          </div>
        )}
        
        {/* Cart subtotal calculation */}
        <div className="d-flex justify-content-end mt-5">
          <div className="bg-light p-4 border rounded" style={{ minWidth: "300px" }}>
            <h4 className="mb-3">
              Cart Subtotal ({cartList?.reduce((acc, item) => acc + item.quantity, 0) || 0} items)
            </h4>
            <h3 className="text-primary mb-4">
              ${(cartList?.reduce((acc, item) => acc + (item.amount * item.quantity) / 100, 0) || 0).toFixed(2)}
            </h3>
            <button type="button" className="btn btn-primary btn-lg w-100" onClick={() => handleCartCheckout(cartList)}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
