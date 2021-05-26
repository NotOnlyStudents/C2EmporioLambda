import { DataMapper, ScanOptions } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import { Category, CategoryFilter, uncategorised } from 'src/models/Category';
import { v4 as uuidv4 } from 'uuid';
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { parseDocument } from 'yaml';
import { contains, ConditionExpression } from '@aws/dynamodb-expressions';
import { readFileSync as readFile } from 'fs';
import CategoryDynamo from 'src/models/CategoryDynamo';
import ProductDynamo from 'src/models/ProductDynamo';
import CategoryRepository from './CategoryRepository';

class DynamoCategoryRepository implements CategoryRepository {
  private readonly mapper: DataMapper;

  constructor() {
    const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
    const dynamodb = new DynamoDB(dynamoConfig);

    this.mapper = new DataMapper({ client: dynamodb });
  }

  getAll = async (filters: CategoryFilter): Promise<Category[]> => {
    const options: ScanOptions = {};

    if (filters) {
      const conditions: ConditionExpression[] = [];

      if (filters.name) {
        conditions.push({
          ...contains(filters.name),
          subject: 'searchName',
        });
      }

      if (conditions.length) {
        options.filter = {
          type: 'And',
          conditions,
        };
      }
    }

    const results = this.mapper.scan(CategoryDynamo, options);

    const categories: Category[] = [];

    for await (const result of results) {
      categories.push(result);
    }

    return categories;
  };

  save = async (category: Category): Promise<Category> => {
    category.id = uuidv4();

    return this.mapper.put(category);
  };

  edit = async (categoryToEdit: Category): Promise<Category> => {
    const category = await this.mapper.get(new CategoryDynamo(categoryToEdit.id));
    const categoryEdited = await this.mapper.update(categoryToEdit);

    const products = await this.mapper.scan(ProductDynamo, {
      filter: {
        ...contains(category.name),
        subject: 'categories',
      },
    });

    for await (const product of products) {
      product.categories[product.categories.indexOf(category.name)] = categoryToEdit.name;

      this.mapper.update(product);
    }

    return categoryEdited;
  };

  delete = async (id: string): Promise<void> => {
    const categoryToDelete = new CategoryDynamo(id);

    const category = await this.mapper.get(categoryToDelete);
    await this.mapper.delete(categoryToDelete);

    const products = await this.mapper.scan(ProductDynamo, {
      filter: {
        ...contains(category.name),
        subject: 'categories',
      },
    });

    for await (const product of products) {
      product.categories.splice(product.categories.indexOf(category.name), 1);

      if (!product.categories.length) {
        product.categories = [uncategorised];
      }

      this.mapper.update(product);
    }
  };
}

export default DynamoCategoryRepository;
