import { Category } from './Category';

export interface GetAllCategoriesResponse {
  data: Category[]
}

export interface CreateCategoryResponse {
  data: Category
}

export interface EditCategoryResponse {
  data: Category
}

export interface DeleteCategoryResponse { }
