import { Order, OrderFilter, OrderPaginator } from 'interfaces/orders/orders';

interface OrderService {
  getAllOrder(token?: string, params?: OrderFilter): Promise<OrderPaginator>;
  getOrderById(token: string, id: string): Promise<Order>;
  createOrder(token: string, order: Order): Promise<string>;
  editOrder(token: string, id: string): Promise<void>;
}

export default OrderService;
