import { APIGatewayProxyEvent } from 'aws-lambda';
import { Product, ProductFilter, ProductPaginator } from 'src/models/Product';
import { GetAllProductsResponse } from 'src/models/product-responses';
import ProductRepository from 'src/repositories/ProductRepository';
import Response from 'src/responses/Response';
import ResponseOk from 'src/responses/ResponseOk';

async function getAllProducts(
  repository: ProductRepository, event: APIGatewayProxyEvent,
): Promise<Response> {
  const filter: ProductFilter = createFilter(event.multiValueQueryStringParameters);
  const response = new ResponseOk<GetAllProductsResponse>({
    data: await repository.filter(filter),
  });

  return response;
}

export function createFilter(query): ProductFilter {
  const filters: ProductFilter = {};

  if (query) {
    if (query.text) {
      filters.text = query.text[0];
    }

    if (query.priceMax) {
      filters.priceMax = parseFloat(query.priceMax[0]);
    }

    if (query.priceMin) {
      filters.priceMin = parseFloat(query.priceMin[0]);
    } else {
      filters.priceMin = 0;
    }

    if (query.categories) {
      filters.categories = query.categories;
    }

    if (query.available) {
      filters.available = query.available[0] === 'true';
    }

    if (query.evidence) {
      filters.evidence = query.evidence[0] === 'true';
    }

    if (query.offset) {
      filters.offset = parseInt(query.offset[0]);
    } else {
      filters.offset = 0;
    }

    if (query.limit) {
      filters.limit = parseInt(query.limit[0]);
    }

    if (query.sort) {
      filters.sort = query.sort[0];
    }
  }

  return filters;
}

export default getAllProducts;
