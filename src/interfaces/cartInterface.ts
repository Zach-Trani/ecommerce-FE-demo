export interface CartItem {
    id: number;
    name: string; // maps to product.descriptionShort
    amount: number; // price in cents
    quantity: number; // quantity in cart
    imgUrl?: string; // optional field for UI display
  }

 export interface CartListContextType {
    cartList: CartItem[] | null;
    setCartList: (cartItems: CartItem[] | null) => void;
  }