import Address from 'src/models/Address';
import { Order } from 'src/models/Order';
import { OrderFilter } from 'src/models/OrderFilters';
import Product from 'src/models/Product';
import { SNSMessageInfo } from 'src/models/SNSMessageInfo';

interface OrderRepository {

  placeOrder(paymentId: string,
    addr: Address,
    prods: Product[],
    customerEmail: string,
    customerId: string,
    additionalInfo: string): Promise<boolean>
  moveToPayedOrders(paymentId: string): Promise<SNSMessageInfo>
  getOrder(orderId: string, customerId?: string): Promise<Order>
  getCustomerOrders(customerId: string, filterParams?: OrderFilter): AsyncIterable<Order>
  getSellerOrders(filterParams: OrderFilter): AsyncIterable<Order>
  fulfillOrder(orderId: string): Promise<Order>
}

export default OrderRepository;
