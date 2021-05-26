import {
  attribute, hashKey, table,
} from '@aws/dynamodb-data-mapper-annotations';
import { uncategorised } from './Category';
import { Product } from './Product';

@table(process.env.PRODUCTS_TABLE_NAME)
class ProductDynamo implements Product {
  @attribute({
    indexKeyConfigurations: {
      ItemIdIndex: 'HASH',
    },
  })
  _id: string;

  @hashKey()
  id: string;

  @attribute({
    indexKeyConfigurations: {
      ItemIdIndex: 'RANGE',
    },
  })
  name?: string;

  @attribute()
  searchName?: string;

  @attribute()
  description?: string;

  @attribute()
  images?: string[];

  @attribute()
  quantity?: number;

  @attribute()
  price?: number;

  @attribute({
    indexKeyConfigurations: {
      ItemIdIndex: 'RANGE',
    },
  })
  discountedPrice?: number;

  @attribute()
  evidence?: boolean;

  @attribute()
  discount?: number;

  @attribute()
  categories?: string[];

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    discount: number = 0,
    evidence: boolean = false,
    images: string[] = [],
    price: number = 1,
    quantity: number = 0,
    categories: string[] = [],
  ) {
    this._id = 'product';
    this.id = id;
    this.name = name;
    this.searchName = this.name.toLowerCase();
    this.description = description;
    this.discount = discount;
    this.discountedPrice = Math.round((price - (price * discount) / (100)) * 100) / 100;
    this.evidence = evidence;
    this.images = images;
    this.price = price;
    this.quantity = quantity;
    if (categories.length) {
      this.categories = categories;
    } else {
      this.categories = [uncategorised];
    }
  }
}

export default ProductDynamo;
