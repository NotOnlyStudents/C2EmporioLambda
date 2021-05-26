import OrderResponse from 'src/models/OrderResponse';
import OrderRepository from 'src/repository/OrderRepository';
import { PaymentEvent, PaymentStatus } from 'src/models/PaymentEvent';
import PaymentResponse from 'src/models/PaymentResponse';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { v4 as uuid } from 'uuid';

const lambda = async (
  repo: OrderRepository,
  paymentEvent: PaymentEvent,
  sns: SNSClient,
  payedCartARN: string,
  productBoughtARN: string,
): Promise<OrderResponse> => {
  if (paymentEvent.type === PaymentStatus.success) {
    try {
      const snsInfo = await repo.moveToPayedOrders(paymentEvent.data.object.id);
      console.log(`cart ${payedCartARN}, product ${productBoughtARN}`);
      console.log(JSON.stringify(snsInfo));
      console.log(await sns.send(new PublishCommand({
        TopicArn: payedCartARN,
        Message: JSON.stringify({ cartId: snsInfo.cartId }),
        MessageGroupId: 'payed-cart',
        MessageDeduplicationId: uuid(),
      })));
      console.log(await sns.send(new PublishCommand({
        TopicArn: productBoughtARN,
        Message: JSON.stringify(snsInfo.products),
        MessageGroupId: 'payed-products',
        MessageDeduplicationId: uuid(),
      })));
    } catch (err) {
      console.log(JSON.stringify(err));
      return new PaymentResponse(500);
    }
  }
  return new PaymentResponse(204);
};
export default lambda;
