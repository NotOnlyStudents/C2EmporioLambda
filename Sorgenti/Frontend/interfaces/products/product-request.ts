import { Product } from './product';

export interface GetAllProductsRequest {
  data: {
    total: number,
    products: Product[]
  }
}

export interface GetOneProductRequest {
  data: {
    token: {
      data: Product
    },
    timeout: string
  },
  hmac: string
}

export interface CreateProductRequest {
  data: Product
}

export interface EditProductRequest {
  data: Product
}

export interface DeleteProductRequest { }
