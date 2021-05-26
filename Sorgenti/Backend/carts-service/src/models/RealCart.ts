import Cart from './interfaces/Cart';
import Product from './interfaces/Product';

class RealCart implements Cart {
  id: string;

  products: Product[];

  constructor(id = '', products: Product[] = []) {
    this.id = id;
    this.products = products;
  }
}

export default RealCart;
