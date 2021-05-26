import { APIGatewayProxyResult } from 'aws-lambda';

class PayentSessionResponse implements APIGatewayProxyResult {
  readonly headers = { 'Access-Control-Allow-Origin': '*' }; // CORS Support

  readonly statusCode: number;

  readonly body: string;

  constructor(statusCode: number, body?: PaymentSessionId) {
    this.statusCode = statusCode;
    this.body = JSON.stringify({ data: body });
  }
}

interface PaymentSessionId {
  sessionId: string
}

export default PayentSessionResponse;
