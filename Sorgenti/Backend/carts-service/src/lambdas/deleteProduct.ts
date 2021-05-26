import { APIGatewayProxyEvent } from 'aws-lambda';
import CartResponse from 'src/models/CartResponse';
import CartRepositoryDelete from 'src/repository/interfaces/CartRepositoryDelete';
import * as Validator from 'validatorjs';

const deleteProduct = async (
  cartId: string,
  event: APIGatewayProxyEvent,
  repository: CartRepositoryDelete,
): Promise<CartResponse> => {
  try {
    const pathValidator = new Validator(event.pathParameters, {
      productId: 'string|required',
    });
    if (pathValidator.fails()) {
      return new CartResponse(400, { message: 'Path parameter is missing' });
    }

    const { productId } = event.pathParameters;
    const product = await repository.deleteProductFromCart(cartId, productId);
    if (product === undefined) return new CartResponse(404, { message: 'Product not found' });
    return new CartResponse(204);
  } catch (error) {
    console.error(event, error);
    return new CartResponse(500, { message: 'Unexpected error' });
  }
};

export default deleteProduct;
