import CartResponse from 'src/models/CartResponse';
import CartToken from 'src/models/CartToken';
import CartRepositoryGet from 'src/repository/interfaces/CartRepositoryGet';

const getCartToken = async (
  cartId: string,
  repository: CartRepositoryGet,
): Promise<CartResponse> => {
  try {
    const cart = await repository.getCart(cartId);

    const token = new CartToken(cart.products);

    return new CartResponse(200, token);
  } catch (error) {
    console.error(cartId, error);
    return new CartResponse(500, { message: 'Unexpected error' });
  }
};

export default getCartToken;
