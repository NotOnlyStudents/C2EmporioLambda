import { Category } from 'src/models/Category';
import Validator from 'validatorjs';

export function validateCategory(categoryToValidate: Category): boolean {
  const rules = {
    name: 'required',
  };

  const validation = new Validator(categoryToValidate, rules);

  return validation.passes() as boolean;
}
