import { SNSMessage, SQSEvent } from 'aws-lambda';
import Product from 'src/models/interfaces/Product';
import ProductEditedMessage from 'src/models/messages/ProductEditedMessage';
import CartRepositoryPatch from 'src/repository/interfaces/CartRepositoryPatch';
import * as Validator from 'validatorjs';

const updateEditedProduct = async (
  event: SQSEvent,
  repository: CartRepositoryPatch,
): Promise<Product[]> => {
  const record = event.Records[0];
  const msg: SNSMessage = JSON.parse(record.body);
  const payload: ProductEditedMessage = { product: JSON.parse(msg.Message) };
  const validator = new Validator(payload, {
    'product.id': 'string|required',
    'product.name': 'string|required',
    'product.description': 'string',
    'product.price': 'integer|min:1|required',
    'product.quantity': 'integer|min:1|required',
    'product.discount': 'integer|min:0|required',
    'product.available': 'boolean',
    'product.evidence': 'boolean',
    'product.images': 'array',
    'product.categories': 'array',
  });

  if (validator.fails()) {
    throw new Error('Payload in the wrong format');
  }

  return repository.updateAllCarts(payload.product);
};

export default updateEditedProduct;
