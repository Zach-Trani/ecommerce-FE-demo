import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "../../../interfaces/cartInterface";

const stripePromise = loadStripe(

  // NOTE: these are safe to display in browser per Stripe, they create payment intents, and are different from secret keys
  // stripe general requests - public live key
  "pk_live_51Qmf3WP1hpgVltNEg69YToNLOIypdkjsYzQkIM0pq5SGpEnle2S9lpAidvMsfHeB8gNeX9JcoCVVUmniHbExsCYz00SV5oNLXX"
  // stripe general requests - public test key
  // "pk_test_51Qmf3WP1hpgVltNEYypXIUyCVP8h4QXrz3UBypyFzkz1jztzyJR7FOF8MWlC7Lxw3D4hO6BUwXEKJ2yENhevz4HG00cMrlk8J5"
);

// Makes a POST request to our back end with our global cartList state
const handleCartCheckout = async (cartList : CartItem[] | null) => {

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

    // Stripe only accepts these product properties
    const stripeCartList = cartList.map((item, index) => {
      if (!item.id) {
        console.warn(`Item at index ${index} (${item.name}) is missing an ID`);
      }
      
      return {
        name: item.name,
        amount: item.amount,
        quantity: item.quantity,
        productId: item.id || null // Explicitly set to null if missing
      };
    });
    
    // Log the stripeCartList to verify product IDs
    // console.log("Stripe Cart List:", stripeCartList);
    // Add a delay before redirecting
  // await new Promise(resolve => setTimeout(resolve, 20000)); // 2 seconds delay

    const baseurl: string =
      window.location.hostname !== "localhost"
        ? "https://zach-ecommerce-backend.azurewebsites.net/product"
        : "http://localhost:9191/product";

    const response = await fetch(`${baseurl}/v1/cart/checkout`, {
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
    });

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
  }
};

export default handleCartCheckout;