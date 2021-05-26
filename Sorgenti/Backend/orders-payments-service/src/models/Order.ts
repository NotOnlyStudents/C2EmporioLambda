import Address from 'src/models/Address';
import Product from 'src/models/Product';

enum OrderStatus {
  new = 'new',
  fulfilled = 'fulfilled',
}

interface Order {
  id: string
  customerEmail: string
  address: Address
  products: Product[]
  date: Date
  status: OrderStatus;
  additionalInfo: string;
}

export { Order, OrderStatus };
