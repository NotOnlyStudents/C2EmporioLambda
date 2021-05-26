import {
  Handler, APIGatewayProxyEvent, Callback, Context,
} from 'aws-lambda';

import createProduct from 'src/endpoints/products/createProduct';
import DynamoProductRepository from 'src/repositories/DynamoProductRepository';
import Response from 'src/responses/Response';

const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<Response>,
) => {
  try {
    const response: Response = await createProduct(
      new DynamoProductRepository(),
      event,
    );

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

export default handler;
