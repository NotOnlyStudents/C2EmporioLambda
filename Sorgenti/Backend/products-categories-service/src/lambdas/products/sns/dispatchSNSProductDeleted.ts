import { PublishCommand, ServiceOutputTypes, SNSClient } from '@aws-sdk/client-sns';
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { parseDocument } from 'yaml';
import { readFileSync as readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const dispatchSNSProductDeleted = async (id: string): Promise<ServiceOutputTypes> => {
  const config: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();

  const sns = new SNSClient({ region: config.region });

  return sns.send(new PublishCommand({
    TopicArn: process.env.PRODUCT_DELETED_ARN,
    Message: JSON.stringify({ id }),
    MessageGroupId: 'product-deleted',
    MessageDeduplicationId: uuidv4(),
  }));
};

export default dispatchSNSProductDeleted;
