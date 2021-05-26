import { APIGatewayProxyEvent } from 'aws-lambda';
import { isSeller } from 'src/lib/auth';
import {
  DeleteCategoryResponse,
} from 'src/models/category-responses';
import CategoryRepository from 'src/repositories/CategoryRepository';
import Response from 'src/responses/Response';
import ResponseError from 'src/responses/ResponseError';
import ResponseOk from 'src/responses/ResponseOk';

async function deleteCategory(
  repository: CategoryRepository, event: APIGatewayProxyEvent,
): Promise<Response> {
  let response;

  if (isSeller(event)) {
    try {
      await repository.delete(event.pathParameters.id);
      response = new ResponseOk<DeleteCategoryResponse>();
    } catch (error) {
      response = new ResponseError({
        message: 'Cannot find the category with that specific ID',
      }, 404);
    }
  } else {
    response = new ResponseError({
      message: 'User not authorized',
    }, 401);
  }

  return response;
}

export default deleteCategory;
