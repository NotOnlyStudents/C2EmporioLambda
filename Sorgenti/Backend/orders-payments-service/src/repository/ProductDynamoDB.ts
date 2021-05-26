import { attribute } from '@aws/dynamodb-data-mapper-annotations';
import Product from 'src/models/Product';

class ProductWithDynamoAnnotations implements Product {
  @attribute()
  id: string;

  @attribute()
  name: string;

  @attribute()
  description: string;

  @attribute()
  images: string[];

  @attribute()
  quantity: number;

  @attribute()
  price: number;

  @attribute()
  available: boolean;

  @attribute()
  discount: number;

  @attribute()
  evidence: boolean;

  @attribute()
  categories: string[];

  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    images: string[] = [],
    quantity: number = 0,
    discount: number = 0,
    price: number = 0,
    available: boolean = false,
    evidence: boolean = false,
    categories: string[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.images = images;
    this.quantity = quantity;
    this.discount = discount;
    this.price = price;
    this.available = available;
    this.evidence = evidence;
    this.categories = categories;
  }
}

const annotate = (
  p: Product,
): ProductWithDynamoAnnotations => (
  new ProductWithDynamoAnnotations(p.id,
    p.name,
    p.description,
    p.images,
    p.quantity,
    p.discount,
    p.price,
    p.available,
    p.evidence,
    p.categories)
);

export { ProductWithDynamoAnnotations, annotate };
