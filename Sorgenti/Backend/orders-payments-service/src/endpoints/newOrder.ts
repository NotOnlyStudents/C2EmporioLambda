import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import OrderRepositoryDynamoDB from 'src/repository/OrderRepositoryDynamoDB';
import { parseDocument } from 'yaml';
import { DynamoDB } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { readFileSync as readFile } from 'fs';
import newOrder from 'src/lambdas/newOrder';
import PaymentResponse from 'src/models/PaymentResponse';

const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
  const repo = new OrderRepositoryDynamoDB(new DynamoDB(dynamoConfig));
  const userName = event.requestContext.authorizer.claims['cognito:username'] as string;
  const userEmail = event.requestContext.authorizer.claims.email as string;
  const userGroups = event.requestContext.authorizer.claims['cognito:groups'] as string[];
  if (userGroups.includes('buyers')) {
    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return new PaymentResponse(400);
    }
    return newOrder(repo,
      body['cart-token'],
      body.address,
      userEmail,
      userName,
      body.additionalInfo);
  }
  return new PaymentResponse(403);
};

export default handler;
