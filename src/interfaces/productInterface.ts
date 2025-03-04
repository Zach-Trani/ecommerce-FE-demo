export interface Product {
    id: number;
    imgUrl: string;
    descriptionShort: string;
    descriptionLong: string | null;  // Optional field
    price: number;
    material: string | null;         // Optional field
    size: string | null;            // Optional field
}

export interface ProductContextType {
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
  }