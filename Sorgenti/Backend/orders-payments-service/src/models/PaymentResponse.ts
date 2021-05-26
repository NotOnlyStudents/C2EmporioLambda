import { APIGatewayProxyResult } from 'aws-lambda';

class PaymentResponse implements APIGatewayProxyResult {
  readonly headers = { 'Access-Control-Allow-Origin': '*' }; // CORS Support

  readonly statusCode: number;

  readonly body: string;

  constructor(statusCode: number, body?: string) {
    this.statusCode = statusCode;
    this.body = JSON.stringify({ data: { sessionId: body } });
  }
}

export default PaymentResponse;
