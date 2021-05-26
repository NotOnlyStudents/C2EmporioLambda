import { HttpHeaders } from 'aws-sdk/clients/iot';

interface Response {
  readonly statusCode: number;
  readonly headers: HttpHeaders;

  toString(): string;
}

export default Response;
