import { APIGatewayProxyEvent } from 'aws-lambda';
import CartResponse from 'src/models/CartResponse';
import CartRepositoryPatch from 'src/repository/interfaces/CartRepositoryPatch';
import * as Validator from 'validatorjs';

const updateProductQuantity = async (
  cartId: string,
  event: APIGatewayProxyEvent,
  repository: CartRepositoryPatch,
): Promise<CartResponse> => {
  try {
    const pathValidator = new Validator(event.pathParameters, {
      productId: 'string|required',
    });
    if (pathValidator.fails()) {
      return new CartResponse(400, { message: 'Wrong productId format' });
    }

    const payload: { quantity: number } = JSON.parse(event.body);
    const payloadValidator = new Validator(payload, {
      quantity: 'integer|min:1',
    });
    if (payloadValidator.fails()) {
      return new CartResponse(400, { message: 'Wrong request body format' });
    }

    const { productId } = event.pathParameters;
    const { quantity } = payload;

    await repository.updateProductQuantity(cartId, productId, quantity);

    return new CartResponse(204);
  } catch (error) {
    console.error(event, error);
    return new CartResponse(500, { message: 'Unexpected error' });
  }
};

export default updateProductQuantity;
