import {
  SQSEvent,
  SQSHandler,
} from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { parseDocument } from 'yaml';
import { readFileSync as readFile } from 'fs';
import DynamoDbCartRepository from 'src/repository/DynamoDbCartRepository';
import removeDeletedProduct from 'src/lambdas/removeDeletedProduct';

const handler: SQSHandler = async (
  event: SQSEvent,
) => {
  try {
    const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
    const repository = new DynamoDbCartRepository(new DynamoDB(dynamoConfig));

    await removeDeletedProduct(event, repository);
  } catch (error) {
    console.error(event, error);
  }
};

export default handler;
