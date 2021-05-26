import Product from 'src/models/interfaces/Product';

interface CartRepositoryPost {
  addProductToCart(id: string, product: Product): Promise<Product>;
}

export default CartRepositoryPost;
