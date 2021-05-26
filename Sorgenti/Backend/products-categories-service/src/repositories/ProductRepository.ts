import { Product, ProductFilter, ProductPaginator } from 'src/models/Product';

interface ProductRepository {
  filter(filters: ProductFilter): Promise<ProductPaginator>;
  getOne(id: string): Promise<Product>;
  save(productToSave: Product): Promise<Product>;
  edit(productToEdit: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}

export default ProductRepository;
