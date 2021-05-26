interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  discount: number;
  price: number;
  available: boolean;
  evidence: boolean;
  categories: string[];
}

export default Product;
