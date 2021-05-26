import { CartToken } from 'interfaces/cart/cart-request';
import { CartProduct, Product } from 'interfaces/products/product';

interface CartService{
  getCartProducts(token): Promise<CartProduct[]>;
  getCartToken(token): Promise<CartToken>;
  postCartProducts(token, product:Product): Promise<void>;
  patchCartProducts(token, productId, quantity): Promise<void>;
  deleteCartProducts(token, productId): Promise<void>;
}

export default CartService;
