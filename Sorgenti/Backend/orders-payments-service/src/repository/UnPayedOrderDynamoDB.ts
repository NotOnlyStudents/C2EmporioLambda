import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';
import Address from 'src/models/Address';
import { AddressWithDynamoAnnotations } from 'src/repository/AddressDynamoDB';
import { ProductWithDynamoAnnotations } from 'src/repository/ProductDynamoDB';
import Product from 'src/models/Product';
import { embed } from '@aws/dynamodb-data-mapper';

@table(process.env.TO_PAY_ORDERS_TABLE_NAME)
class UnPayedOrderWithDynamoAnnotations {
  @hashKey()
  paymentId: string;

  @attribute()
  customerId: string;

  @attribute()
  customerEmail: string;

  @attribute()
  address: AddressWithDynamoAnnotations;

  @attribute({ memberType: embed(ProductWithDynamoAnnotations) })
  products: ProductWithDynamoAnnotations[];

  @attribute()
  additionalInfo: string;

  constructor(
    paymentId: string = '',
    customerEmail: string = '',
    customerId: string = '',
    address: Address = new AddressWithDynamoAnnotations(),
    products: Product[] = [],
    additionalInfo: string = '',
  ) {
    this.paymentId = paymentId;
    this.customerEmail = customerEmail;
    this.customerId = customerId;
    this.address = address;
    this.products = products;
    this.additionalInfo = additionalInfo;
  }
}

export default UnPayedOrderWithDynamoAnnotations;
