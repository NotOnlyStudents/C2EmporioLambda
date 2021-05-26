import { Category } from 'src/models/Category';
import { validateCategory } from 'src/validation/validate-category';

describe('Validate category to insert', () => {
  it('Valid category', () => {
    const category: Category = {
      name: 'Category',
      id: '1',
    };

    expect(validateCategory(category)).toBeTruthy();
  });

  it('Invalid category name', () => {
    const category: Category = {
      name: '',
      id: '1',
    };

    expect(validateCategory(category)).toBeFalsy();
  });
});
