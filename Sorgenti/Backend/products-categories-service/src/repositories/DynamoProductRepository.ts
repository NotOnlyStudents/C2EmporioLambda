import { DataMapper, QueryOptions } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import {
  ConditionExpression,
  between,
  contains,
  greaterThan,
  equals,
} from '@aws/dynamodb-expressions';
import {
  Product, ProductFilter, ProductPaginator, SortType,
} from 'src/models/Product';
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { parseDocument } from 'yaml';
import ProductDynamo from 'src/models/ProductDynamo';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync as readFile } from 'fs';
import ProductRepository from './ProductRepository';

class DynamoProductRepository implements ProductRepository {
  private readonly mapper: DataMapper;

  constructor() {
    const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
    const dynamodb = new DynamoDB(dynamoConfig);

    this.mapper = new DataMapper({ client: dynamodb });
  }

  filter = async (filters: ProductFilter): Promise<ProductPaginator> => {
    let sortByPrice = false;
    let keyCondition: ConditionExpression;
    const queryOptions: QueryOptions = {};

    switch (filters.sort) {
      case SortType.cheaper: {
        queryOptions.indexName = 'PriceIndex';
        queryOptions.scanIndexForward = true;
        sortByPrice = true;
        break;
      }
      case SortType.expensive: {
        queryOptions.indexName = 'PriceIndex';
        queryOptions.scanIndexForward = false;
        sortByPrice = true;
        break;
      }
      default: { // Alphabetical sort
        queryOptions.indexName = 'NameIndex';
        queryOptions.scanIndexForward = true;

        keyCondition = {
          subject: '_id',
          ...equals('product'),
        };
      }
    }

    if (sortByPrice) {
      keyCondition = {
        type: 'And',
        conditions: [
          {
            subject: '_id',
            ...equals('product'),
          },
        ],
      };

      if (filters.priceMax !== undefined) {
        keyCondition.conditions.push({
          subject: 'discountedPrice',
          ...between(filters.priceMin, filters.priceMax),
        });
      }
    }

    if (filters) {
      const conditions: ConditionExpression[] = [];

      if (filters.text) {
        conditions.push({
          ...contains(filters.text.toLowerCase()),
          subject: 'searchName',
        });
      }

      if (filters.available) {
        conditions.push({
          ...greaterThan(0),
          subject: 'quantity',
        });
      }

      if (filters.evidence) {
        conditions.push({
          ...equals(filters.evidence),
          subject: 'evidence',
        });
      }

      if (!sortByPrice && filters.priceMax !== undefined) {
        conditions.push({
          ...between(filters.priceMin, filters.priceMax),
          subject: 'discountedPrice',
        });
      }

      if (filters.categories) {
        const categoryCondition = (category) => ({
          ...contains(category),
          subject: 'categories',
        });

        conditions.push({
          type: 'And',
          conditions: filters.categories.map(categoryCondition),
        });
      }

      if (conditions.length) {
        queryOptions.filter = {
          type: 'And',
          conditions,
        };
      }
    }

    const results = this.mapper.query(ProductDynamo, keyCondition, queryOptions);

    const products: Product[] = [];
    let total = 0;

    for await (const result of results) {
      ++total;

      if (filters.limit !== undefined) {
        if ((products.length < filters.limit)
          && total > (filters.limit * filters.offset)) {
          products.push(result);
        }
      } else {
        products.push(result);
      }
    }

    return {
      products,
      total,
    };
  };

  getOne = async (id: string): Promise<Product> => {
    const productToSearch: Product = new ProductDynamo(id);

    const product = await this.mapper.get(productToSearch);

    return product;
  };

  save = async (productToSave: Product): Promise<Product> => {
    productToSave.id = uuidv4();

    return this.mapper.put(productToSave);
  };

  edit = async (productToEdit: Product): Promise<Product> => this.mapper.update(productToEdit);

  delete = async (id: string): Promise<void> => {
    const productToDelete = new ProductDynamo(id);

    this.mapper.delete(productToDelete);
  };
}

export default DynamoProductRepository;
