import { Category, CategoryFilter } from 'src/models/Category';

interface CategoryRepository {
  getAll(filters: CategoryFilter): Promise<Category[]>;
  save(category: Category): Promise<Category>;
  edit(categoryToEdit: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}

export default CategoryRepository;
