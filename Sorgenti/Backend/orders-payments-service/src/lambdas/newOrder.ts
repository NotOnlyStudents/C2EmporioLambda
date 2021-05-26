import PaymentResponse from 'src/models/PaymentResponse';
import OrderRepository from 'src/repository/OrderRepository';
import { createHmac } from 'crypto';
import Stripe from 'stripe';
import CartToken from 'src/models/CartToken';
import Address from 'src/models/Address';

const clientBaseUrl = 'https://emporiolambda-nos.netlify.app';

function validateToken(t: CartToken): boolean {
  const hmac = createHmac('sha256', 'password')
    .update(JSON.stringify(t.token))
    .digest('base64');
  return hmac === t.hmac && new Date(t.token.timeout).getTime() >= Date.now();
}

async function sendOrderToStripe(
  _paymentDue: number,
): Promise<{ sessionId: string, paymentIntent: string }> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Carrello',
        },
        unit_amount: _paymentDue * 100,
      },
      quantity: 1,
    }],
    success_url: `${clientBaseUrl}/orders`,
    cancel_url: `${clientBaseUrl}/cart/payment?payment_failure=true`,
  });
  return {
    sessionId: session.id,
    paymentIntent: session.payment_intent.toString(),
  };
}
const lambda = async (
  repo: OrderRepository,
  t: CartToken,
  addr: Address,
  customerEmail: string,
  customerId: string,
  additionalInfo: string,
): Promise<PaymentResponse> => {
  if (!(customerEmail && customerId && t) || !validateToken(t)) return new PaymentResponse(400);
  const payment = t.token.data.products
    .reduce((prev, curr) => (curr.quantity * curr.price * (1 - curr.discount / 100)) + prev, 0);
  const session = await sendOrderToStripe(payment);
  if (await repo.placeOrder(session.paymentIntent,
    addr,
    t.token.data.products,
    customerEmail,
    customerId,
    additionalInfo)) return new PaymentResponse(200, session.sessionId);
  return new PaymentResponse(500);
};
export default lambda;
