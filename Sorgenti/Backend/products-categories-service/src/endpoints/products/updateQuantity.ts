import { SNSMessage, SQSEvent, SQSRecord } from 'aws-lambda';
import { Product } from 'src/models/Product';
import { SNSQuantityEditedPayload } from 'src/models/product-responses';
import ProductRepository from 'src/repositories/ProductRepository';

async function updateQuantity(
  repository: ProductRepository,
  event: SQSEvent,
) {
  const record: SQSRecord = event.Records[0];
  const msg: SNSMessage = JSON.parse(record.body);

  const orders: SNSQuantityEditedPayload[] = JSON.parse(msg.Message);

  for await (const order of orders) {
    const product: product = await repository.getOne(order.id);

    product.quantity -= order.quantity;

    await repository.edit(product);
  }
}

export default updateQuantity;
