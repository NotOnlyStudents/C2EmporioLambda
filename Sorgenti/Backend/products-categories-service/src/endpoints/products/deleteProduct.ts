import { APIGatewayProxyEvent } from 'aws-lambda';
import dispatchSNSProductDeleted from 'src/lambdas/products/sns/dispatchSNSProductDeleted';
import { isSeller } from 'src/lib/auth';
import { deleteImageFromS3 } from 'src/lib/S3API';
import { DeleteProductResponse } from 'src/models/product-responses';
import ProductRepository from 'src/repositories/ProductRepository';
import ProductsImagesS3Repository from 'src/repositories/ProductsImagesS3Repository';
import S3Repository from 'src/repositories/S3Repository';
import Response from 'src/responses/Response';
import ResponseError from 'src/responses/ResponseError';
import ResponseOk from 'src/responses/ResponseOk';

async function deleteProduct(
  repository: ProductRepository,
  event: APIGatewayProxyEvent,
): Promise<Response> {
  let response: Response;

  if (isSeller(event)) {
    try {
      const { id } = event.pathParameters;

      const product = await repository.getOne(id);

      const s3: S3Repository = new ProductsImagesS3Repository();

      await Promise.all(product.images.map(async (image) => deleteImageFromS3(s3, image)));

      await repository.delete(id);

      dispatchSNSProductDeleted(id);

      response = new ResponseOk<DeleteProductResponse>();
    } catch (error) {
      response = new ResponseError({
        message: 'Cannot find the product with that specific ID',
      }, 404);
    }
  } else {
    response = new ResponseError({
      message: 'User not authorized',
    }, 401);
  }

  return response;
}

export default deleteProduct;
