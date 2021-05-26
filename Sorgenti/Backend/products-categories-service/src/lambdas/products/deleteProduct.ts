import {
  Handler, APIGatewayProxyEvent, Callback, Context,
} from 'aws-lambda';
import deleteProduct from 'src/endpoints/products/deleteProduct';

import DynamoProductRepository from 'src/repositories/DynamoProductRepository';
import Response from 'src/responses/Response';

const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<Response>,
) => {
  try {
    const response: Response = await deleteProduct(
      new DynamoProductRepository(),
      event,
    );

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

export default handler;
