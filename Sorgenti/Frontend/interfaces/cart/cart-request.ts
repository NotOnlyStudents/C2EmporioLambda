import { CartProduct } from 'interfaces/products/product';

export interface CartToken {
  token: {
    data: {
      products: CartProduct[]
    }
  },
  hmac: string
}

export interface CartGETRequest {
  data: CartToken,
  timeout: string
}

export interface CartPostRequest{
  data: CartProduct[];
}

export interface CartPatchRequest{
  data: number;
}
