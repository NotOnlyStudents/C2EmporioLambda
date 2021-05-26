import Product from 'src/models/interfaces/Product';

export default interface CartRepositoryDelete {
  deleteProductFromCart(cartId: string, productId: string): Promise<Product>
  deleteProduct(productId: string): Promise<Product[]>
}
