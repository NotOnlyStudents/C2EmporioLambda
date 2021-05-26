import { APIGatewayProxyEvent } from 'aws-lambda';
import CartResponse from 'src/models/CartResponse';
import ProductToken from 'src/models/ProductToken';
import CartRepositoryPost from 'src/repository/interfaces/CartRepositoryPost';
import * as Validator from 'validatorjs';

const addProduct = async (
  cartId: string,
  event: APIGatewayProxyEvent,
  repository: CartRepositoryPost,
): Promise<CartResponse> => {
  try {
    const bodyToken: ProductToken = JSON.parse(event.body);
    const token = new ProductToken(bodyToken);

    const tokenValidator = new Validator(token, {
      'token.data.id': 'string|required',
      'token.data.name': 'string|required',
      'token.data.description': 'string',
      'token.data.price': 'integer|min:1|required',
      'token.data.quantity': 'integer|min:1|required',
      'token.data.discount': 'integer|min:0|required',
      'token.data.available': 'boolean',
      'token.data.evidence': 'boolean',
      'token.data.images': 'array',
      'token.data.categories': 'array',
      'token.timeout': 'date|required',
      hmac: 'string|required',
    });
    if (tokenValidator.fails()) {
      return new CartResponse(400, { message: 'Request body is in wrong format' });
    }

    if (token.checkToken()) return new CartResponse(500, { message: 'Token expired or invalid' });

    // Extract product
    const product = token.token.data;
    await repository.addProductToCart(cartId, product);

    return new CartResponse(204);
  } catch (error) {
    console.error(event, error);
    return new CartResponse(500, { message: 'Unexpected error' });
  }
};

export default addProduct;
