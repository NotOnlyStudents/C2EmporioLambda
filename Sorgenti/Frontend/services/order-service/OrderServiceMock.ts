import faker from 'faker';
import {
  Order, OrderFilter, OrderPaginator, OrderStatus,
} from 'interfaces/orders/orders';
import { PLPProductItem } from 'interfaces/products/product';
import OrderService from './OrderService';

class OrderServiceMock implements OrderService {
  getAllOrder = async (token?: string, params?: OrderFilter): Promise<OrderPaginator> => ({
    orders: (new Array(10)).fill(0).map(
      (): Order => ({
        id: faker.datatype.uuid(),
        customerEmail: faker.internet.email(),
        address: {
          id: faker.datatype.uuid(),
          nation: faker.address.country(),
          city: faker.address.city(),
          address: faker.address.streetAddress(),
          cap: parseFloat(faker.address.zipCode()),
        },
        products: (new Array(2)).fill(0).map((): PLPProductItem => ({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          image: faker.random.image(),
          quantity: faker.datatype.number({ min: 0 }),
          price: parseFloat(faker.commerce.price()),
          evidence: faker.datatype.boolean(),
          discount: faker.datatype.number({ min: 0, max: 100 }),
          discountedPrice: parseFloat(faker.commerce.price()),
        })),
        additionalInfo: faker.datatype.string(),
        date: faker.datatype.datetime().toISOString(),
        status: OrderStatus.new,
      }),
    ),
    total: 5,
  });

  getOrderById = async (token: string, id: string): Promise<Order> => ({
    id: faker.datatype.uuid(),
    customerEmail: faker.internet.email(),
    address: ({
      id: faker.datatype.uuid(),
      nation: faker.address.country(),
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      cap: parseFloat(faker.address.zipCode()),
    }
    ),
    products: (new Array(2)).fill(0).map((): PLPProductItem => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      image: faker.random.image(),
      quantity: faker.datatype.number({ min: 0 }),
      price: parseFloat(faker.commerce.price()),
      evidence: faker.datatype.boolean(),
      discount: faker.datatype.number({ min: 0, max: 100 }),
      discountedPrice: parseFloat(faker.commerce.price()),
    })),
    additionalInfo: faker.datatype.string(),
    date: faker.datatype.datetime().toISOString(),
    status: OrderStatus.fulfilled,
  });

  createOrder = async (token: string, order: Order): Promise<string> => {
    console.log(token);
    return token;
  };

  editOrder = async (token: string, id: string): Promise<void> => {};
}

export default OrderServiceMock;
