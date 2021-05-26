import OrderResponse from 'src/models/OrderResponse';
import OrderRepository from 'src/repository/OrderRepository';
import uuidV4Regex from 'src/models/uuidRegex';

const lambda = async (
  orderId: string,
  repo: OrderRepository,
  customerId?: string,
): Promise<OrderResponse> => {
  if (!uuidV4Regex.test(orderId)) return new OrderResponse(400);
  const order = await repo.getOrder(orderId, customerId);
  return typeof order !== 'undefined' ? new OrderResponse(200, order) : new OrderResponse(404);
};

export default lambda;
