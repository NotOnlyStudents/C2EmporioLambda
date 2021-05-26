import Cart from 'src/models/interfaces/Cart';
import Product from '../../models/interfaces/Product';

interface CartRepositoryPatch {
  emptyCart(cartId: string): Promise<Cart>
  updateAllCarts(product: Product): Promise<Product[]>
  updateProductQuantity(cartId: string, productId: string, quantity: number): Promise<Product>
}

export default CartRepositoryPatch;
