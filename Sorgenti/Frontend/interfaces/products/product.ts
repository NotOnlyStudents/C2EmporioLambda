export interface Product {
  id?: string;
  name?: string;
  description?: string;
  images?: string[];
  quantity?: number | string;
  price?: number;
  evidence?: boolean;
  discount?: number;
  discountedPrice?: number;
  categories?: string[];
}

export interface PLPProductItem {
  id: string,
  name: string,
  price: number,
  image: string,
  evidence: boolean,
  discount: number,
  discountedPrice: number;
  quantity: number,
}

export interface CartProduct {
  id?: string;
  name?: string;
  image?: string;
  quantity?: number;
  price?: number;
  discount?: number;
  discountedPrice?: number;
}

export interface OrderProductItem {
  id?: string;
  name?: string;
  image?: string;
  quantity?: number;
  price?: number;
  discount?: number;
  discountedPrice?: number;
}

export enum SortType {
  alphabetical = 'alphabetical',
  cheaper = 'cheaper',
  expensive = 'expensive',
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

export interface ProductValidation {
  name: boolean;
  images: boolean;
  quantity: boolean;
  price: boolean;
  evidence: boolean;
  discount: boolean;
}

export interface ProductPaginator {
  total: number,
  products: PLPProductItem[]
}
