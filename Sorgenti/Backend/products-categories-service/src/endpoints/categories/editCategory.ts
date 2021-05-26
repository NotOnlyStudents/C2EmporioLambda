import { APIGatewayProxyEvent } from 'aws-lambda';
import { isSeller } from 'src/lib/auth';
import { Category } from 'src/models/Category';
import { CreateCategoryResponse, EditCategoryResponse, GetAllCategoriesResponse } from 'src/models/category-responses';
import CategoryDynamo from 'src/models/CategoryDynamo';
import CategoryRepository from 'src/repositories/CategoryRepository';
import Response from 'src/responses/Response';
import ResponseError from 'src/responses/ResponseError';
import ResponseOk from 'src/responses/ResponseOk';
import { validateCategory } from 'src/validation/validate-category';

async function editCategory(
  repository: CategoryRepository, event: APIGatewayProxyEvent,
): Promise<Response> {
  let response;

  if (isSeller(event)) {
    const category: Category = JSON.parse(event.body || '{}');

    const categoryEdit = new CategoryDynamo(
      event.pathParameters.id,
      category.name,
    );

    if (validateCategory(categoryEdit)) {
      const categoryEdited = await repository.edit(categoryEdit);

      response = new ResponseOk<EditCategoryResponse>({
        data: categoryEdited,
      });
    } else {
      response = new ResponseError({
        message: 'some field does not satisfy its minimum requirement',
      });
    }
  } else {
    response = new ResponseError({
      message: 'User not authorized',
    }, 401);
  }

  return response;
}

export default editCategory;
