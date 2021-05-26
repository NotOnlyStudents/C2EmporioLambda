import CartToken from '../src/models/CartToken';
import Product from '../src/models/DynamoDbCartProduct';

describe('Check the cart token', () => {
  test('Valid cart token', () => {
    const token = new CartToken([
      new Product('1', '1', 'Prova', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('2', '1', 'Prova2', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('3', '1', 'Prova3', 'Descrizione', 1250, 12, true, 0, false, [], []),
    ]);

    expect(token.checkToken()).toBeTruthy();
  });

  test('Invalid cart token cause of timeout', () => {
    const token = new CartToken([
      new Product('1', '1', 'Prova', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('2', '1', 'Prova2', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('3', '1', 'Prova3', 'Descrizione', 1250, 12, true, 0, false, [], []),
    ]);
    token.token.timeout = new Date(Date.now() - 1000); // timeout expired a second ago

    expect(token.checkToken()).toBeFalsy();
  });

  test('Invalid cart token cause of hmac', () => {
    const token = new CartToken([
      new Product('1', '1', 'Prova', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('2', '1', 'Prova2', 'Descrizione', 1250, 12, true, 0, false, [], []),
      new Product('3', '1', 'Prova3', 'Descrizione', 1250, 12, true, 0, false, [], []),
    ]);

    token.token.data.products[0].price = 0;

    expect(token.checkToken()).toBeFalsy();
  });
});
