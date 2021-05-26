import { Category } from './category';

export interface GetAllCategoriesRequest {
  data: Category[]
}

export interface CreateCategoryRequest {
  data: Category
}

export interface EditCategoryRequest {
  data: Category
}

export interface RemoveCategoryRequest {
}
