import { Order, OrderStatus } from 'src/models/Order';
import OrderRepository from 'src/repository/OrderRepository';
import { PayedOrderWithDynamoAnnotations, deannotate } from 'src/repository/PayedOrderDynamoDB';
import UnPayedOrderWithDynamoAnnotations from 'src/repository/UnPayedOrderDynamoDB';
import { DataMapper, QueryOptions, ScanOptions } from '@aws/dynamodb-data-mapper';
import {
  ConditionExpression, equals, greaterThanOrEqualTo, lessThanOrEqualTo, UpdateExpression,
} from '@aws/dynamodb-expressions';
import { DynamoDB } from 'aws-sdk';
import { OrderFilter } from 'src/models/OrderFilters';
import Address from 'src/models/Address';
import Product from 'src/models/Product';
import { SNSMessageInfo } from 'src/models/SNSMessageInfo';

function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

const toConditionExpression = (filter: OrderFilter): ConditionExpression => {
  const conds = [];
  if (filter.email) conds.push({ ...equals(filter.email), subject: 'customerEmail' });
  if (filter.status) conds.push({ ...equals(filter.status), subject: 'status' });
  if (filter.start) {
    conds.push({
      ...greaterThanOrEqualTo(filter.start.getTime()),
      subject: 'numberDate',
    });
  }
  if (filter.end) {
    conds.push({
      ...lessThanOrEqualTo(filter.end.getTime()),
      subject: 'numberDate',
    });
  }

  return {
    type: 'And',
    conditions: conds,
  };
};
class OrderRepositoryDynamoDB implements OrderRepository {
  readonly mapper: DataMapper;

  constructor(dynamoConnection: DynamoDB) {
    this.mapper = new DataMapper({ client: dynamoConnection });
  }

  async placeOrder(
    paymentID: string,
    addr: Address,
    products: Product[],
    customerEmail: string,
    customerId: string,
    additionalInfo: string,
  ): Promise<boolean> {
    const newOrder = new UnPayedOrderWithDynamoAnnotations(paymentID,
      customerEmail,
      customerId,
      addr,
      products,
      additionalInfo);
    try {
      const result = await this.mapper.put(newOrder);
      return typeof result !== 'undefined';
    } catch {
      return false;
    }
  }

  async getOrder(orderId: string, customerId: string = ''): Promise<Order> {
    let annotatedResult: PayedOrderWithDynamoAnnotations;
    try {
      annotatedResult = await this.mapper.get(new PayedOrderWithDynamoAnnotations(orderId));
    } catch (err) {
      if (err.name && err.name === 'ItemNotFoundException') return undefined;
      throw err;
    }
    if (customerId !== '' && annotatedResult.customerId !== customerId) return undefined;
    return deannotate(annotatedResult);
  }

  async* getCustomerOrders(custId: string, filterParams?: OrderFilter): AsyncIterable<Order> {
    const scanParams: QueryOptions = { indexName: 'userIdIndex' };
    if (!isEmpty(filterParams)) {
      const filterExpression = toConditionExpression(filterParams);
      scanParams.filter = filterExpression;
    }
    const annotatedResult = this.mapper.query(PayedOrderWithDynamoAnnotations,
      { customerId: custId },
      scanParams);
    for await (const elem of annotatedResult) {
      yield deannotate(elem);
    }
  }

  async* getSellerOrders(filterParams?: OrderFilter): AsyncIterable<Order> {
    let scanParams: ScanOptions = {};
    if (!isEmpty(filterParams)) {
      const filterExpression = toConditionExpression(filterParams);
      scanParams = { filter: filterExpression };
    }
    const annotatedResult = this.mapper.scan(PayedOrderWithDynamoAnnotations, scanParams);
    for await (const elem of annotatedResult) {
      yield deannotate(elem);
    }
  }

  async fulfillOrder(orderId: string): Promise<Order> {
    const fulfilled = new UpdateExpression();
    fulfilled.set('status', OrderStatus.fulfilled);
    const cond: ConditionExpression = { ...equals(orderId), subject: 'id' };
    try {
      return deannotate(await this.mapper.executeUpdateExpression(
        fulfilled,
        { id: orderId },
        PayedOrderWithDynamoAnnotations,
        { condition: cond },
      ));
    } catch (err) {
      if (err.code && err.code === 'ConditionalCheckFailedException') return undefined;
      throw err;
    }
  }

  async moveToPayedOrders(paymentId: string): Promise<SNSMessageInfo> {
    try {
      const o = await this.mapper.get(new UnPayedOrderWithDynamoAnnotations(paymentId));
      const o2 = new PayedOrderWithDynamoAnnotations('', o.customerId, o.customerEmail, o.address, o.products, o.additionalInfo);
      await this.mapper.put(o2);
      await this.mapper.delete(o);
      return {
        cartId: o.customerId,
        products: o2.products.map((p) => ({
          id: p.id, quantity: p.quantity,
        })),
      };
    } catch (err) {
      console.log(err);
      if (err.name && err.name === 'ItemNotFoundException') return undefined;
      throw err;
    }
  }
}

export default OrderRepositoryDynamoDB;
