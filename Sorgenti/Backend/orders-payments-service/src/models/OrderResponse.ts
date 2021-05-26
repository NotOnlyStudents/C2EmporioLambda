import { APIGatewayProxyResult } from 'aws-lambda';
import { Order } from './Order';

class OrderResponse implements APIGatewayProxyResult {
  readonly headers = { 'Access-Control-Allow-Origin': '*' }; // CORS Support

  readonly statusCode: number;

  readonly body: string;

  constructor(statusCode: number, body?: Order | Order[]) {
    this.statusCode = statusCode;
    this.body = JSON.stringify({ data: body });
  }
}

export default OrderResponse;
