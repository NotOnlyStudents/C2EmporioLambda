import {
  Handler, APIGatewayProxyEvent, Callback, Context,
} from 'aws-lambda';
import deleteCategory from 'src/endpoints/categories/deleteCategory';
import DynamoCategoryRepository from 'src/repositories/DynamoCategoryRepository';

import Response from 'src/responses/Response';

const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<Response>,
) => {
  try {
    const response: Response = await deleteCategory(
      new DynamoCategoryRepository(),
      event,
    );

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

export default handler;
