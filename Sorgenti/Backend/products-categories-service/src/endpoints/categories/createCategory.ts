import { APIGatewayProxyEvent } from 'aws-lambda';
import { isSeller } from 'src/lib/auth';
import { Category } from 'src/models/Category';
import { CreateCategoryResponse } from 'src/models/category-responses';
import CategoryDynamo from 'src/models/CategoryDynamo';
import CategoryRepository from 'src/repositories/CategoryRepository';
import Response from 'src/responses/Response';
import ResponseError from 'src/responses/ResponseError';
import ResponseOk from 'src/responses/ResponseOk';
import { validateCategory } from 'src/validation/validate-category';

async function createCategory(
  repository: CategoryRepository, event: APIGatewayProxyEvent,
): Promise<Response> {
  let response;

  if (isSeller(event)) {
    const category: Category = JSON.parse(event.body || '{}');

    const categoryToSave = new CategoryDynamo(
      '',
      category.name,
    );

    if (validateCategory(categoryToSave)) {
      const categorySaved = await repository.save(categoryToSave);

      response = new ResponseOk<CreateCategoryResponse>({
        data: categorySaved,
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

export default createCategory;
