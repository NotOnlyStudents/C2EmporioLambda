import CartToken from '../src/models/CartToken';
import Product from '../src/models/DynamoDbCartProduct';
import CartResponse from '../src/models/CartResponse';

describe('Check the cart response', () => {
  test('Valid cart responses', () => {
    const token = new CartToken([
      new Product('1', '1', 'Prova', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('2', '1', 'Prova2', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('3', '1', 'Prova3', 'Descrizione', 1250, 12, true, 0, false, [], []),
    ]);
    const responseToken = new CartResponse(200, token);
    const responseMsg = new CartResponse(400, { message: 'Success test' });

    expect(responseToken.statusCode).toStrictEqual(200);
    expect(responseToken.body).toStrictEqual(JSON.stringify({ data: token }));

    expect(responseMsg.statusCode).toStrictEqual(400);
    expect(responseMsg.body).toStrictEqual(JSON.stringify({ data: { message: 'Success test' } }));
  });
});
