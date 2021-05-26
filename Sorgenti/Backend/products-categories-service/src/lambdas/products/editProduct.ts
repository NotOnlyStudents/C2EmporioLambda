import {
  Handler, APIGatewayProxyEvent, Callback, Context,
} from 'aws-lambda';

import editProduct from 'src/endpoints/products/editProduct';
import DynamoProductRepository from 'src/repositories/DynamoProductRepository';
import Response from 'src/responses/Response';

const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<Response>,
) => {
  try {
    const response: Response = await editProduct(
      new DynamoProductRepository(),
      event,
    );

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

export default handler;
