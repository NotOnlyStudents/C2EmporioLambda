import { Category } from 'interfaces/categories/category';

interface CategoryService {
  getCategories(text: string) : Promise<Category[]>;
  addCategory(token: string, category: Category): Promise<Category>;
  editCategory(token: string, id: string, category: Category): Promise<Category>;
  removeCategory(token: string, id: string): Promise<void>;
}

export default CategoryService;
