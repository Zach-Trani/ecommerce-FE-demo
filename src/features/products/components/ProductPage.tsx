import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ProductContext } from "../../../app/App";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Qmf3WP1hpgVltNEYypXIUyCVP8h4QXrz3UBypyFzkz1jztzyJR7FOF8MWlC7Lxw3D4hO6BUwXEKJ2yENhevz4HG00cMrlk8J5"
);

/**
 * Page that allows a user to add a product to their cart
 *
 * @returns
 */
const ProductPage = () => {
  const { selectedProduct } = useContext(ProductContext)!;

  // remove when bypass of useContext is implmented
  if (!selectedProduct) {
    return <Navigate to="/" replace />;
  }

  const handleCartCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // Example cart items - in a real app, this would come from your shopping cart state
      const cartItems = [
        {
          name: "Phone Stand",
          amount: 1999, // $19.99 in cents
          quantity: 1,
        },
        {
          name: "Stanley Accessory",
          amount: 2499, // $24.99 in cents
          quantity: 2,
        },
      ];

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
            items: cartItems,
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
                  src={selectedProduct.imgUrl}
                  className="card-img-top"
                  alt={selectedProduct.descriptionShort}
                />
                <div className="card-body">
                  <h2 className="card-title">
                    {selectedProduct.descriptionLong}
                  </h2>
                  <p className="card-text">Price: ${selectedProduct.price}</p>
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
                <div className="">product image</div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
