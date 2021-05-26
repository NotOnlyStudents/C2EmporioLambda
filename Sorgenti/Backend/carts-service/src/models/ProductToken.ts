import { createHmac } from 'crypto';
import Product from './interfaces/Product';
import Token from './interfaces/Token';
import TokenValidator from './interfaces/TokenValidator';

class ProductToken implements Token<Product>, TokenValidator {
  token: {
    data: Product;
    timeout: Date;
  };

  hmac: string;

  constructor(token: Token<Product>) {
    this.token = {
      ...token.token,
    };
    this.hmac = token.hmac;
  }

  signToken = () => createHmac('sha256', 'password').update(JSON.stringify(this.token)).digest('base64');

  checkTimout = () => new Date(this.token.timeout) >= new Date();

  checkHmac = () => this.hmac === this.signToken();

  checkToken = () => this.checkTimout() && this.checkHmac();
}

export default ProductToken;
