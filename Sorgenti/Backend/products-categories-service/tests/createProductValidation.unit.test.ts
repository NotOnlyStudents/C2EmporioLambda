import { validateProduct } from 'src/validation/validate-product';

describe('validateProduct product to create', () => {
  test('Valid product', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name of product',
      description: 'description',
      images: ['https://picsum.photos/200'],
      quantity: -1,
      price: 1.00,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeTruthy();
  });

  test('Empty product name', () => {
    const product = {
      id: '1',
      _id: '1',
      name: '',
      description: 'description',
      images: ['https://picsum.photos/200'],
      quantity: -1,
      price: 1.00,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Product name longer than 100', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'A'.replace('A', 'AAAAAAAAAAA').repeat(10),
      description: 'description',
      images: ['https://picsum.photos/200'],
      quantity: -1,
      price: 1.00,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Empty images', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: [],
      quantity: -1,
      price: 1.00,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('More than 4 images', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D', 'E'],
      quantity: -1,
      price: 1.00,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Empty quantity', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D'],
      // quantity: ,
      price: 1.00,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Not integer quantity', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D'],
      quantity: 1.10,
      price: 1.00,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Empty price', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D'],
      quantity: 1,
      evidence: true,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Price less than 0', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D'],
      quantity: 1,
      evidence: true,
      price: -2,
      discount: 20,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Discount not an integer', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D'],
      quantity: 1,
      evidence: true,
      price: 2,
      discount: 20.10,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Discount less than 0', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D'],
      quantity: 1,
      evidence: true,
      price: 2,
      discount: -2,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });

  test('Discount more than 100', () => {
    const product = {
      id: '1',
      _id: '1',
      name: 'Name',
      description: 'description',
      images: ['A', 'B', 'C', 'D'],
      quantity: 1,
      evidence: true,
      price: 2,
      discount: 101,
      categories: ['a'],
    };

    expect(validateProduct(product)).toBeFalsy();
  });
});
