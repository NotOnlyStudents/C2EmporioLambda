import { PublishCommand, ServiceOutputTypes, SNSClient } from '@aws-sdk/client-sns';
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { Product } from 'src/models/Product';
import { parseDocument } from 'yaml';
import { readFileSync as readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const dispatchSNSProductEdited = async (product: Product): Promise<ServiceOutputTypes> => {
  const config: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();

  const sns = new SNSClient({ region: config.region });

  return sns.send(new PublishCommand({
    TopicArn: process.env.PRODUCT_EDITED_ARN,
    Message: JSON.stringify(product),
    MessageGroupId: 'product-edited',
    MessageDeduplicationId: uuidv4(),
  }));
};

export default dispatchSNSProductEdited;
