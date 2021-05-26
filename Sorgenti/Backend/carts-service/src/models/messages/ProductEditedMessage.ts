import Product from '../interfaces/Product';

export default class ProductEditedMessage {
  constructor(readonly product: Product) {
    this.product = product;
  }
}
