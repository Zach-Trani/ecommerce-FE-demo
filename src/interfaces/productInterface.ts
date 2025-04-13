// product is our core database entity model retrieved from back end - see in front end at "/products/:id"
export interface Product {
    id: number;
    imgUrl: string;
    descriptionShort: string;
    descriptionLong: string | null;  // Optional field
    price: number;
    material: string | null;         // Optional field
    size: string | null;            // Optional field
}

// global context state for Product interface - state for extracting an individual product out of products
export interface ProductContextType {
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
  }