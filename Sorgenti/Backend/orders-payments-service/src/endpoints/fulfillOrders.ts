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
import fulfillOrder from 'src/lambdas/fulfillOrders';
import OrderResponse from 'src/models/OrderResponse';

const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
  const repo = new OrderRepositoryDynamoDB(new DynamoDB(dynamoConfig));
  const userGroups = event.requestContext.authorizer.claims['cognito:groups'] as string[];
  if (userGroups.includes('sellers')) return fulfillOrder(event.pathParameters.ID, repo);
  return new OrderResponse(403);
};

export default handler;
