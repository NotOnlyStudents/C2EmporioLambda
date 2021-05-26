import { APIGatewayProxyEvent } from 'aws-lambda';
import { isSeller } from 'src/lib/auth';
import { CategoryFilter } from 'src/models/Category';
import { GetAllCategoriesResponse } from 'src/models/category-responses';
import CategoryRepository from 'src/repositories/CategoryRepository';
import Response from 'src/responses/Response';
import ResponseError from 'src/responses/ResponseError';
import ResponseOk from 'src/responses/ResponseOk';

async function getAllCategories(
  repository: CategoryRepository,
  event: APIGatewayProxyEvent,
): Promise<Response> {
  let response;

  const categories = await repository.getAll(createFilter(event));

  response = new ResponseOk<GetAllCategoriesResponse>({
    data: categories,
  });

  return response;
}

function createFilter(event: APIGatewayProxyEvent): CategoryFilter {
  const { text } = event.queryStringParameters || { };
  const filters: CategoryFilter = {};

  if (text) {
    filters.name = text.toLocaleLowerCase();
  } else {
    filters.name = '';
  }

  return filters;
}

export default getAllCategories;
