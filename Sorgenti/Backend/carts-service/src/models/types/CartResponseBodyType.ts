import Cart from '../interfaces/Cart';
import Token from '../interfaces/Token';

type CartResponseBodyType = Token<Partial<Cart>> | { message: string };

export default CartResponseBodyType;
