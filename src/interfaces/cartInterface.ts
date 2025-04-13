// CartItem is a modified version of Product Interface, defines individual products to be posted to Stripe - used after "/checkout"
export interface CartItem {
    id: number;
    name: string; // maps to product.descriptionShort
    amount: number; // price in cents
    quantity: number; // quantity in cart
    imgUrl?: string; // optional field for UI display
  }

// global state for a list of CartItem's - the payload posted to the Stripe API for checkout, also used to update local storage to persist shopping cart
 export interface CartListContextType {
    cartList: CartItem[] | null;
    setCartList: (cartItems: CartItem[] | null) => void;
  }