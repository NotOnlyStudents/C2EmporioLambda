import { attribute } from '@aws/dynamodb-data-mapper-annotations';
import Address from 'src/models/Address';

class AddressWithDynamoAnnotations implements Address {
  @attribute()
  id: string;

  @attribute()
  nation: string;

  @attribute()
  city: string;

  @attribute()
  address: string;

  @attribute()
  cap: number;

  constructor(id: string = '', nation: string = '', city: string = '', address: string = '', cap: number = 0) {
    this.id = id;
    this.nation = nation;
    this.city = city;
    this.address = address;
    this.cap = cap;
  }
}

const annotate = (addr: Address): AddressWithDynamoAnnotations => (
  new AddressWithDynamoAnnotations(addr.id, addr.nation, addr.city, addr.address, addr.cap)
);

export { AddressWithDynamoAnnotations, annotate };
