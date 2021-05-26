import HTTPRequest from 'lib/HTTPRequest';
import { Category } from 'interfaces/categories/category';
import queryString from 'query-string';
import {
  GetAllCategoriesRequest, CreateCategoryRequest, EditCategoryRequest, RemoveCategoryRequest,
} from 'interfaces/categories/category-request';
import CategoryService from './CategoryService';

class CategoryServiceFetch implements CategoryService {
  getCategories = async (text: string = ''): Promise<Category[]> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, 'categories',
    );
    const query: string = queryString.stringify({ text });

    const res: GetAllCategoriesRequest = await req.get<GetAllCategoriesRequest>(query);

    return res.data;
  };

  addCategory = async (token: string, category: Category): Promise<Category> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, 'categories',
    );

    const body: string = JSON.stringify(category);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res: CreateCategoryRequest = await req.post<CreateCategoryRequest>(body, headers);

    return res.data;
  };

  editCategory = async (token: string, id: string, category: Category): Promise<Category> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `categories/${id}`,
    );

    const body: string = JSON.stringify(category);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res: EditCategoryRequest = await req.patch<EditCategoryRequest>(body, headers);

    return res.data;
  };

  removeCategory = async (token: string, id: string): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `categories/${id}`,
    );

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await req.delete<RemoveCategoryRequest>('', headers);
  };
}

export default CategoryServiceFetch;
