import { APIGatewayProxyEvent } from 'aws-lambda';
import { createHmac } from 'crypto';
import { Product } from 'src/models/Product';
import { GetOneProductResponse, GetOneProductTokenType } from 'src/models/product-responses';
import ProductRepository from 'src/repositories/ProductRepository';
import Response from 'src/responses/Response';
import ResponseError from 'src/responses/ResponseError';
import ResponseOk from 'src/responses/ResponseOk';

async function getProductById(
  repository: ProductRepository,
  event: APIGatewayProxyEvent,
): Promise<Response> {
  const { id } = event.pathParameters;

  let response: Response;

  try {
    const product: Product = await repository.getOne(id);

    response = new ResponseOk<GetOneProductResponse>(createToken(product));
  } catch (error) {
    response = new ResponseError({
      message: 'Cannot find the product with that specific ID',
    }, 404);
  }

  return response;
}

function createToken(product: Product): GetOneProductResponse {
  function nowPlus5Minutes(): string {
    const minutes = 5;

    return new Date((new Date()).getTime() + minutes * 60000).toString();
  }

  const token: GetOneProductTokenType = {
    token: {
      data: product,
    },
    timeout: nowPlus5Minutes(),
  };

  const hmac = createHmac('sha256', 'password')
    .update(JSON.stringify(token))
    .digest('base64');

  return {
    data: token,
    hmac,
  };
}

export default getProductById;
