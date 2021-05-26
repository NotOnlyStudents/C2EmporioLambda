import {
  PLPProductItem, Product, ProductFilter, ProductPaginator,
} from 'interfaces/products/product';

interface ProductService {
  getAllProduct(params?: ProductFilter): Promise<ProductPaginator>;
  getProductById(id: string): Promise<Product>;
  createProduct(token: string, product: Product): Promise<Product>;
  editProduct(token: string, id: string, product: Product): Promise<Product>;
  deleteProduct(token: string, id: string): Promise<void>;
}

export default ProductService;
