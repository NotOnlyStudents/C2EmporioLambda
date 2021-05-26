import { Product, ProductPaginator } from './Product';

export interface GetAllProductsResponse {
  data: ProductPaginator;
}

export interface CreateProductResponse {
  data: Product;
}

export interface GetOneProductResponse {
  data: GetOneProductTokenType,
  hmac: string
}

export interface GetOneProductTokenType {
  token: {
    data: Product
  },
  timeout: string
}

export interface EditProductResponse {
  data: Product
}

export interface DeleteProductResponse {

}

export interface SNSQuantityEditedPayload {
  id: string,
  quantity: number
}
