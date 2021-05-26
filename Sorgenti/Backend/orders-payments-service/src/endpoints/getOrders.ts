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
import getOrders from 'src/lambdas/getOrders';
import { OrderFilter } from 'src/models/OrderFilters';
import OrderResponse from 'src/models/OrderResponse';

const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
  const repo = new OrderRepositoryDynamoDB(new DynamoDB(dynamoConfig));
  const userName = event.requestContext.authorizer.claims['cognito:username'] as string;
  const userGroups = event.requestContext.authorizer.claims['cognito:groups'] as string[];
  const filters: OrderFilter = { ...event.queryStringParameters };
  if ('start' in filters) filters.start = new Date(filters.start);
  if ('end' in filters) filters.end = new Date(filters.end);
  if (userGroups.includes('buyers')) return getOrders(repo, filters, userName);
  if (userGroups.includes('sellers')) return getOrders(repo, filters);
  return new OrderResponse(403);
};

export default handler;
