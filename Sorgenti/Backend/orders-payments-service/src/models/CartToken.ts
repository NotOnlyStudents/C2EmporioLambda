import Product from 'src/models/Product';

interface CartToken {
  token: TokenSignedProductData
  hmac: string
}

interface TokenSignedProductData {
  data: ProductsData
  timeout: string
}

interface ProductsData {
  products: Product[]
}

export default CartToken;
