import { createHmac } from 'crypto';
import Cart from './interfaces/Cart';
import Product from './interfaces/Product';
import Token from './interfaces/Token';
import TokenValidator from './interfaces/TokenValidator';

class CartToken implements Token<Partial<Cart>>, TokenValidator {
  token: {
    data: Partial<Cart>;
    timeout: Date;
  };

  hmac: string;

  constructor(products: Product[]) {
    // Setup timout date
    const timeout = new Date();
    timeout.setMinutes(timeout.getMinutes() + 5);

    this.token = {
      data: { products },
      timeout,
    };

    this.hmac = this.signToken();
  }

  signToken = () => createHmac('sha256', 'password').update(JSON.stringify(this.token)).digest('base64');

  checkTimout = () => new Date(this.token.timeout) >= new Date();

  checkHmac = () => this.hmac === this.signToken();

  checkToken = () => this.checkTimout() && this.checkHmac();
}

export default CartToken;
