import {
  SQSEvent, SQSHandler,
} from 'aws-lambda';

import updateQuantity from 'src/endpoints/products/updateQuantity';
import DynamoProductRepository from 'src/repositories/DynamoProductRepository';

const handler: SQSHandler = async (
  event: SQSEvent,
) => {
  try {
    await updateQuantity(
      new DynamoProductRepository(),
      event,
    );
    console.log('Success');
  } catch (error) {
    console.error(error);
  }
};

export default handler;
