import {
  attribute, hashKey, table,
} from '@aws/dynamodb-data-mapper-annotations';
import { Category } from './Category';

@table(process.env.CATEGORIES_TABLE_NAME)
class CategoryDynamo implements Category {
  @hashKey()
  id: string;

  @attribute()
  name?: string;

  @attribute()
  searchName?: string;

  constructor(
    id: string = '',
    name: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.searchName = this.name.toLowerCase();
  }
}

export default CategoryDynamo;
