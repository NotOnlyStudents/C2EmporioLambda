import Cart from '../../models/interfaces/Cart';

interface CartRepositoryGet {
  getCart(id: string): Promise<Cart>;
}

export default CartRepositoryGet;
