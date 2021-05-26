export default class PaymentSuccessfulMessage {
  constructor(readonly cartId: string/* , readonly paymentIntent: string */) {
    this.cartId = cartId;
    // this.paymentIntent = paymentIntent
  }
}
