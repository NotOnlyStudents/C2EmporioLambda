import { isFilter, OrderFilter } from '../src/models/OrderFilters';

describe('Check the order filter', () => {
  test('Valid order email filter', () => {
    const filterEmail: OrderFilter = {
      email: 'pippo.pluto@mail.com',
    };

    expect(isFilter(filterEmail)).toBeTruthy();
  });

  test('Invalid email absent', () => {
    const filterEmail: OrderFilter = {
      email: '',
    };

    expect(isFilter(filterEmail)).toBeFalsy();
  });

  test('Invalid email username too long', () => {
    const filterEmail: OrderFilter = {
      email: `${'pippo'.repeat(15)}@mail.com`,
    };

    expect(isFilter(filterEmail)).toBeFalsy();
  });

  test('Invalid email too long', () => {
    const filterEmail: OrderFilter = {
      email: `${'pippo.pluto.'.repeat(25)}@mail.com`,
    };

    expect(isFilter(filterEmail)).toBeFalsy();
  });

  test('Invalid email domain parts too long', () => {
    const filterEmail: OrderFilter = {
      email: `pippo.pluto@${'mail'.repeat(16)}.com`,
    };

    expect(isFilter(filterEmail)).toBeFalsy();
  });
});
