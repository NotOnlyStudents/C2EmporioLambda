import { Order, OrderStatus } from '../src/models/Order';
import Address from '../src/models/Address';
import { ProductWithDynamoAnnotations } from '../src/repository/ProductDynamoDB';
import OrderResponse from '../src/models/OrderResponse';

describe('Check the order response', () => {
  test('Valid order responses', () => {
    const address: Address = {
      id: '1',
      nation: 'Italia',
      city: 'Venezia',
      address: 'Via Roma, 10',
      cap: 44501,
    };

    const order1: Order = {
      id: '1',
      customerEmail: 'pippo.pluto@mail.com',
      address,
      products: [
        new ProductWithDynamoAnnotations('1', 'Prova', 'Descrizione', [], 12, 0, 1250, true, false, []),
        new ProductWithDynamoAnnotations('2', 'Prova2', 'Descrizione', [], 12, 0, 1250, true, false, []),
        new ProductWithDynamoAnnotations('3', 'Prova3', 'Descrizione', [], 12, 0, 1250, true, false, []),
      ],
      date: new Date(),
      status: OrderStatus.new,
      additionalInfo: '',
    };

    const orderResponse = new OrderResponse(200, order1);
    const ordersResponse = new OrderResponse(200, [order1]);
    const errorOrderResponse = new OrderResponse(400);

    expect(orderResponse.statusCode).toStrictEqual(200);
    expect(orderResponse.body).toStrictEqual(JSON.stringify({ data: order1 }));

    expect(ordersResponse.statusCode).toStrictEqual(200);
    expect(ordersResponse.body).toStrictEqual(JSON.stringify({ data: [order1] }));

    expect(errorOrderResponse.statusCode).toStrictEqual(400);
    expect(errorOrderResponse.body).toStrictEqual(JSON.stringify({}));
  });
});
