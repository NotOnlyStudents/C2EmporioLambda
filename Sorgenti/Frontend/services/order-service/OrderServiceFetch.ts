import HTTPRequest from 'lib/HTTPRequest';
import {
  OrderFilter, Order, OrderPaginator,
} from 'interfaces/orders/orders';
import queryString from 'query-string';
import { GetAllOrdersRequest, GetOneOrderRequest } from 'interfaces/orders/order-request';
// import { productToCartProduct } from 'interfaces/products/product-converter';
import { productToOrderProductItem } from 'interfaces/products/product-converter';
import OrderService from './OrderService';

class OrderServiceFetch implements OrderService {
  getAllOrder = async (token?: string, params?: OrderFilter): Promise<OrderPaginator> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL, 'orders');
    const query: string = queryString.stringify(params);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res: GetAllOrdersRequest = await req.get<GetAllOrdersRequest>(query, headers);

    const paginator: OrderPaginator = {
      orders: res.data.map(
        (order): Order => ({ ...order, products: order.products.map(productToOrderProductItem) }),
      ),
      total: res.data.length,
    };

    return paginator;
  };

  getOrderById = async (token: string, id: string): Promise<Order> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL, `orders/${id}`);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res: GetOneOrderRequest = await req.get<GetOneOrderRequest>('', headers);

    return { ...res.data, products: res.data.products.map(productToOrderProductItem) };
  };

  createOrder = async (token: string, order: Order): Promise<string> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL, 'orders');
    const body: string = JSON.stringify(order);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res: string = await req.post<string>(body, headers);

    return res;
  };

  editOrder = async (token: string, id: string): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL, `orders/${id}`);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res: void = await req.patch<void>('', headers);

    return res;
  };
}

export default OrderServiceFetch;
