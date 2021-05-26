export interface Product {
  _id: string;
  id: string;
  name?: string;
  description?: string;
  images?: string[];
  quantity?: number;
  price?: number;
  evidence?: boolean;
  discount?: number;
  categories?: string[];
}

export interface ProductFilter {
  text?: string,
  categories?: string[],
  priceMax?: number,
  priceMin?: number,
  available?: boolean,
  evidence?: boolean,
  offset?: number,
  limit?: number,
  sort?: SortType,
}

export enum SortType {
  alphabetical = 'alphabetical',
  cheaper = 'cheaper',
  expensive = 'expensive',
}

export interface ProductPaginator {
  total: number,
  products: Product[]
}
