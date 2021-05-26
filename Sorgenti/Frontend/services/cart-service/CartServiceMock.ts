import {
  CartProduct, Product,
} from 'interfaces/products/product';
import faker from 'faker';
import { CartToken } from 'interfaces/cart/cart-request';
import CartService from './CartService';

export default class CartServiceMock implements CartService {
  getCartToken(token: any): Promise<CartToken> {
    throw new Error('Method not implemented.');
  }

  postCartProducts(token: any, product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }

  patchCartProducts(token: any, productId: any, quantity: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteCartProducts(token: any, productId: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getCartProducts = async (): Promise<CartProduct[]> => new Array(10).fill(0).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    image: faker.random.image(),
    quantity: faker.datatype.number({ max: 10 }),
    discount: faker.datatype.number({ min: 0, max: 100 }),
    price: parseFloat(faker.commerce.price(0, 100)),
  }));
}
