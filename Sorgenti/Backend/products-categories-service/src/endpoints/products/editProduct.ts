import { APIGatewayProxyEvent } from 'aws-lambda';
import dispatchSNSProductEdited from 'src/lambdas/products/sns/dispatchSNSProductEdited';
import { isSeller } from 'src/lib/auth';
import { deleteImageFromS3, isBase64Data, uploadImageToS3 } from 'src/lib/S3API';
import { Product } from 'src/models/Product';
import { EditProductResponse } from 'src/models/product-responses';
import ProductDynamo from 'src/models/ProductDynamo';
import ProductRepository from 'src/repositories/ProductRepository';
import ProductsImagesS3Repository from 'src/repositories/ProductsImagesS3Repository';
import S3Repository from 'src/repositories/S3Repository';
import Response from 'src/responses/Response';
import ResponseError from 'src/responses/ResponseError';
import ResponseOk from 'src/responses/ResponseOk';
import { validateProduct } from 'src/validation/validate-product';

async function editProduct(
  repository: ProductRepository, event: APIGatewayProxyEvent,
): Promise<Response> {
  let response: Response;

  if (isSeller(event)) {
    const product: Product = JSON.parse(event.body || '{}');
    const { id } = event.pathParameters;

    const productToEdit: ProductDynamo = new ProductDynamo(
      id,
      product.name,
      product.description,
      product.discount,
      product.evidence,
      product.images,
      product.price,
      product.quantity,
      product.categories,
    );

    console.log(productToEdit);

    if (validateProduct(productToEdit)) {
      try {
        const actualProduct: Product = await repository.getOne(id);

        const s3: S3Repository = new ProductsImagesS3Repository();

        actualProduct.images
          .filter(
            (image) => !productToEdit.images.includes(image),
          )
          .map((image) => deleteImageFromS3(s3, image));

        const imagesUploaded = await Promise.all(productToEdit.images
          .map((image, index) => ({ image, index }))
          .filter(
            (data) => isBase64Data(data.image),
          )
          .map(
            async (data) => (
              {
                index: data.index,
                image: await uploadImageToS3(s3, data.image),
              }
            ),
          ));

        imagesUploaded.forEach(
          (data) => {
            productToEdit.images[data.index] = data.image;
          },
        );

        const productEdited: Product = await repository.edit(productToEdit);

        console.log(productEdited);

        dispatchSNSProductEdited(productEdited);

        response = new ResponseOk<EditProductResponse>({
          data: productEdited,
        });
      } catch (error) {
        response = new ResponseError({
          message: 'Cannot find the product with that ID',
        }, 404);
      }
    } else {
      response = new ResponseError({
        message: 'Some field does not satisfy its minimum requirement',
      });
    }
  } else {
    response = new ResponseError({
      message: 'User not authorized',
    }, 401);
  }

  return response;
}

export default editProduct;
