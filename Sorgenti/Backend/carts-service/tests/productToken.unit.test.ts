import ProductToken from '../src/models/ProductToken';
import Product from '../src/models/DynamoDbCartProduct';

describe('Check the product token', () => {
  test('Valid product token', () => {
    const token = new ProductToken({
      token: {
        data: new Product('1', '1', 'Prova', 'Descrizione', 1250, 12, true, 0, false, [], []),
        timeout: new Date(Date.now() + 600_000),
      },
      hmac: '',
      signToken: () => '',
    });
    token.hmac = token.signToken();

    expect(token.checkToken()).toBeTruthy();
  });

  test('Invalid product token cause of timeout', () => {
    const token = new ProductToken({
      token: {
        data: new Product('1', '1', 'Prova', 'Descrizione', 1250, 12, true, 0, false, [], []),
        timeout: new Date(Date.now() - 1000), // timeout expired a second ago
      },
      hmac: '',
      signToken: () => '',
    });
    token.hmac = token.signToken();

    expect(token.checkToken()).toBeFalsy();
  });

  test('Invalid product token cause of hmac', () => {
    const token = new ProductToken({
      token: {
        data: new Product('1', '1', 'Prova', 'Descrizione', 1250, 12, true, 0, false, [], []),
        timeout: new Date(Date.now() + 600_000),
      },
      hmac: '',
      signToken: () => '',
    });
    token.hmac = token.signToken();

    token.token.data.price = 0;

    expect(token.checkToken()).toBeFalsy();
  });
});
