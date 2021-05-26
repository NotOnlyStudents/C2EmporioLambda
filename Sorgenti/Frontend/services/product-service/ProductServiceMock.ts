import faker from 'faker';
import {
  PLPProductItem, Product, ProductFilter, ProductPaginator,
} from 'interfaces/products/product';
import ProductService from './ProductService';

class ProductServiceMock implements ProductService {
  getAllProduct = async (params?: ProductFilter): Promise<ProductPaginator> => ({
    products: (new Array(10)).fill(0).map(
      (): PLPProductItem => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.random.image(),
        discount: faker.datatype.number({ min: 0, max: 100 }),
        discountedPrice: 0,
        evidence: faker.datatype.boolean(),
        quantity: faker.datatype.number({ min: 0 }),
      }),
    ),
    total: 10,
  });

  getProductById = async (id: string): Promise<Product> => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    images: ['https://picsum.photos/id/0/5616/3744', 'https://picsum.photos/id/1/5616/3744', 'https://picsum.photos/id/10/2500/1667', 'https://picsum.photos/id/100/2500/1656'],
    quantity: faker.datatype.number({ min: 0 }),
    price: parseFloat(faker.commerce.price()),
    evidence: faker.datatype.boolean(),
    discount: faker.datatype.number({ min: 0, max: 100 }),
    categories: ['a', 'b'],
  });

  createProduct = async (token: string, product: Product): Promise<Product> => ({
    id: faker.datatype.uuid(),
    ...product,
  });

  editProduct = async (token: string, id: string, product: Product): Promise<Product> => ({
    id,
    ...product,
  });

  deleteProduct = async (token: string, id: string): Promise<void> => {

  };
}

export default ProductServiceMock;
