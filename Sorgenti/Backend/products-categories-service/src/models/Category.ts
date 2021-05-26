// export type Category = string;

export interface Category {
  id: string,
  name?: string,
  searchName?: string
}

export interface CategoryFilter {
  name?: string;
}

export const uncategorised = 'Uncategorised';
