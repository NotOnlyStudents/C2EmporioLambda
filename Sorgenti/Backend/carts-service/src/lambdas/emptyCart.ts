import { SNSMessage, SQSEvent } from 'aws-lambda';
import Cart from 'src/models/interfaces/Cart';
import PaymentSuccessfulMessage from 'src/models/messages/PaymentSuccessfulMessage';
import CartRepositoryPatch from 'src/repository/interfaces/CartRepositoryPatch';
import * as Validator from 'validatorjs';

const emptyCart = async (
  event: SQSEvent,
  repository: CartRepositoryPatch,
): Promise<Cart> => {
  const record = event.Records[0];

  const msg: SNSMessage = JSON.parse(record.body);
  const payload: PaymentSuccessfulMessage = JSON.parse(msg.Message);
  const validator = new Validator(payload, {
    cartId: 'required|string',
  });

  if (validator.fails()) {
    throw new Error(validator.errors.first('cartId') as string);
  }

  const { cartId } = payload;
  const cart = await repository.emptyCart(cartId);
  if (!cart) {
    throw new Error(`Cart with id ${cartId} not found`);
  }

  return cart;
};

export default emptyCart;
