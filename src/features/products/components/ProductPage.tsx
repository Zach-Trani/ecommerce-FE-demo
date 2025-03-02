import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CartListContext, ProductContext } from "../../../app/App";
import { loadStripe } from "@stripe/stripe-js";

interface CartItem {
  id: number;
  name: string; // maps to product.descriptionShort
  amount: number; // price in cents
  quantity: number; // quantity in cart
  imgUrl?: string; // optional field for UI display
}

const stripePromise = loadStripe(
  "pk_test_51Qmf3WP1hpgVltNEYypXIUyCVP8h4QXrz3UBypyFzkz1jztzyJR7FOF8MWlC7Lxw3D4hO6BUwXEKJ2yENhevz4HG00cMrlk8J5"
);

/**
 * Page that allows a user to add a product to their cart
 *
 * @returns
 */
const ProductPage = () => {
  const { id } = useParams(); // gets product id from URL
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext)!; // next add to cart item
  const { cartList, setCartList } = useContext(CartListContext)!;

  // selectedProduct global state only exists when a product is clicked from HomePage.tsx,
  // this manually updates the state if a user directly navigates to '/product/1'
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!selectedProduct && id) {
        try {
          const response = await fetch(`http://localhost:9191/products/${id}`);

          if (!response.ok) {
            throw new Error(`Product with ID ${id} not found.`)
          }

          const productData = await response.json()
          setSelectedProduct(productData)
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {

        }
      }
    }

    fetchProductDetails();
  }, [id, selectedProduct, setSelectedProduct])

  // need to remove - creates some unintended behavior currently
  // if (!selectedProduct) {
  //   return <Navigate to="/" replace />;
  // }

  // Makes a POST request to our back end with our global cartList state
  const handleCartCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // reject checkout attempt if cart is empty
      if (!cartList || cartList.length === 0) {
        console.error("Cart is empty");
        return;
      }

      // Example cart items - in a real app, this would come from your shopping cart state
      // Should we be creating a schema out of this or just use interfaces?
      // May be able to send images to stripe checkout page, see https://docs.stripe.com/payments/checkout
      // const cartItems = [
      //   {
      //     name: "Phone Stand",
      //     amount: 1999, // $19.99 in cents
      //     quantity: 1,
      //   },
      //   {
      //     name: "Stanley Accessory",
      //     amount: 2499, // $24.99 in cents
      //     quantity: 2,
      //   },
      // ];

      // Stripe only accepts these product properties
      const stripeCartList = cartList.map((item) => ({
        name: item.name,
        amount: item.amount,
        quantity: item.quantity
      }))

      // Needed???
      // round to avoid floating-point precision errors
      // const amountInCents = Math.round(selectedProduct.price * 100);

      const response = await fetch(
        // "https://zach-ecommerce-backend.azurewebsites.net/product/v1/cart/checkout",
        "http://localhost:9191/product/v1/cart/checkout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            items: stripeCartList,
            currency: "usd",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Redirect to Stripe checkout using the session ID from the response
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // You might want to show an error message to the user here
    }
  };

  // pushes the selectedProduct to our global cartList state. need to account for qty of products
  const addToCart = () => {
    // Edge case not handled:
    // right now selectedProduct exists only if navigated to through to homepage
    // can selectedProduct exist if we navigate directly to '/products/1'?
    if (selectedProduct) {
      const cartItem = {
        id: selectedProduct.id,
        name: selectedProduct.descriptionShort,
        amount: Math.round(selectedProduct.price * 100), // Convert to cents
        quantity: 1,
        imgUrl: selectedProduct.imgUrl,
      };

      // If cart is empty, initialize it
      if (!cartList) {
        setCartList([cartItem]);
        return;
      }

      // Check if product already exists in cart
      const existingItemIndex = cartList.findIndex(item => item.id === selectedProduct.id);

      if (existingItemIndex >= 0) {
        // selectedProduct is already in cart, increment quantity
        const updatedCart = [...cartList];
        updatedCart[existingItemIndex].quantity += 1;
        setCartList(updatedCart);
      } else {
        // new product in list, add to cart
        setCartList([...cartList, cartItem]);
      }
    }
  };

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div
        className="container-fluid p-3 mb-2 bg-secondary text-white"
        style={{ maxWidth: "1200px" }}
      >
        <div className="row">
          <div className="col-md-8">
            <div className="container mt-4">
              <div className="card p-3 mb-2 bg-dark text-white">
                <img
                  src={selectedProduct?.imgUrl}
                  className="card-img-top"
                  alt={selectedProduct?.descriptionShort}
                />
                <div className="card-body">
                  <h2 className="card-title">
                    {selectedProduct?.descriptionLong}
                  </h2>
                  <p className="card-text">Price: ${selectedProduct?.price}</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm" // Changed class to className
                    onClick={() => handleCartCheckout()}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Offcanvas side bar to display shopping cart */}
          <div className="col-md-4 mb-2 bg-dark text-white">
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
              <div className="offcanvas-body">
                {/* Map through global cartList state and return a mini-cart display */}
                {/* At some point we will make a full-page-cart display at "/cart"  */}

                {cartList?.map((product) => (
                  <>
                    <img src={product.imgUrl} />
                    <div>{product.name}</div>
                    <div>{product.amount}</div>
                    <div>Quantity: x</div>
                  </>
                ))}
                <div>Cart Subtotal (x items): $xx.xx</div>

                {/* <div className="">product image</div>
                <div className="">product description</div>
                <div className="">quantity just added</div>
                <div className="">price</div>
                <div className="">cart subtotal (# of items): $price</div>
                <div className="">See more similar products:</div>
                <div className="">
                  product image, description, price, view oroduct
                </div>
                <div className="">
                  product image, description, price, view oroduct
                </div>
                <div className="">
                  product image, description, price, view oroduct
                </div>
                <div className="">
                  product image, description, price, view oroduct
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
