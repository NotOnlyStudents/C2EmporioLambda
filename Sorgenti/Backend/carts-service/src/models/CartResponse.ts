import { APIGatewayProxyResult } from 'aws-lambda';
import CartResponseBodyType from './types/CartResponseBodyType';

class CartResponse implements APIGatewayProxyResult {
  readonly headers = { 'Access-Control-Allow-Origin': '*' }; // CORS Support

  readonly statusCode: number;

  readonly body: string;

  constructor(statusCode: number, body?: CartResponseBodyType) {
    this.statusCode = statusCode;
    this.body = JSON.stringify({ data: body });
  }
}

export default CartResponse;
